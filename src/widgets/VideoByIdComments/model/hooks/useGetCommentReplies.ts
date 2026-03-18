import { useLazyGetCommentRepliesQuery } from '@/redux/services/comments';
import { useCallback, useEffect, useState } from 'react';
import useIntersectionObserver from '@/shareds/hooks/useIntersectionObserver';
import { useEffectWithoutFirstCall } from '@/shareds/hooks/useEffectWithoutFirstCall';
import { IGetCommentRepliesRequest } from '@/redux/services/comments/requestModel';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { commentsActions } from '@/redux/actions/commentsActions';

interface IGetCommentRepliesQueryProps {
  commentId: string;
  isRepliesOpened: boolean;
}

export const useGetCommentReplies = (props: IGetCommentRepliesQueryProps) => {
  const { commentId, isRepliesOpened } = props;
  const [fetchReplies, { isFetching }] = useLazyGetCommentRepliesQuery();
  const [cursor, setCursor] = useState('');
  const hasNextPage = Boolean(cursor.length);

  const { commentReplies } = useSelector(selectors.commentsSelector);
  const { setCommentReplies } = useActions(commentsActions);

  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '400px',
    threshold: 0.1,
  });

  const fetchCommentReplies = useCallback(
    async (params: IGetCommentRepliesRequest) => {
      const res = await fetchReplies(params);
      if (res.data?.data) {
        const newCursor = res?.data?.meta?.page?.cursor ?? '';
        setCursor(newCursor);
      }
    },
    [commentId, cursor],
  );

  useEffectWithoutFirstCall(() => {
    if (isRepliesOpened) {
      setCommentReplies({ commentId, commentReplies: [] });
      setCursor('');
      fetchCommentReplies({ commentId });
    }
  }, [isRepliesOpened]);

  useEffect(() => {
    if (isIntersecting && !isFetching && hasNextPage) {
      fetchCommentReplies({ commentId, cursor });
    }
  }, [isIntersecting]);

  return {
    hasNextPage,
    isFetching,
    commentReplies: commentReplies[commentId] || [],
    ref,
  };
};
