import { RefObject, useEffect, useState } from 'react';
import { useLazyGetCommentsByVideoIdQuery } from '@/redux/services/comments';
import useIntersectionObserver from '@/shareds/hooks/useIntersectionObserver';
import { ICommentSortData } from '@/widgets/VideoByIdComments';
import { IGetCommentsByVideoIdRequest } from '@/redux/services/comments/requestModel';
import { useEffectWithoutFirstCall } from '@/shareds/hooks/useEffectWithoutFirstCall';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { commentsActions } from '@/redux/actions/commentsActions';

interface PropsUseFetchCommentsByVideoId {
  videoId: string;
  containerRef?: RefObject<HTMLDivElement>;
  sortData?: ICommentSortData;
}

export const useFetchCommentsByVideoId = (
  props: PropsUseFetchCommentsByVideoId,
) => {
  const { videoId, sortData } = props;
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '400px',
    threshold: 0.1,
  });

  const [fetchComments, { isFetching }] = useLazyGetCommentsByVideoIdQuery();
  const [cursor, setCursor] = useState('');
  const hasNextPage = Boolean(cursor.length);

  const { comments } = useSelector(selectors.commentsSelector);
  const { deleteComments } = useActions(commentsActions);

  const fetchCommentsByVideoId = async (
    params: IGetCommentsByVideoIdRequest,
  ) => {
    const res = await fetchComments(params);
    if (res.data?.data) {
      const newCursor = res?.data?.meta?.page?.cursor ?? '';
      setCursor(newCursor);
    }
  };

  useEffect(() => {
    deleteComments();
    fetchCommentsByVideoId({ videoId });
    return () => {
      deleteComments();
      setCursor('');
    };
  }, [videoId]);

  useEffect(() => {
    if (isIntersecting && !isFetching && hasNextPage) {
      fetchCommentsByVideoId({
        videoId,
        cursor,
        ...sortData,
      });
    }
  }, [isIntersecting]);

  useEffectWithoutFirstCall(() => {
    setCursor('');
    fetchCommentsByVideoId({
      videoId,
      ...sortData,
    });
  }, [sortData?.sortField, sortData?.sortOrder]);

  return {
    hasNextPage,
    comments,
    isFetching,
    ref,
  };
};
