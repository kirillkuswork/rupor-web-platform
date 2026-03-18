import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { renderCommentSkeletons } from '@/entities/Comment';
import React, { useMemo } from 'react';
import { VFlex } from '@/shareds/ui/Flex';
import { TCommentsSortField, TCommentsSortOrder } from '@/redux/services/comments/requestModel';
import { Order } from '@/shareds/types/sortOrder';
import { useTranslation } from 'next-i18next';
import { VideoByIdComment } from './VideoByIdComment/VideoByIdComment';
import { useFetchCommentsByVideoId } from '../model/hooks/useFetchCommentsByVideoId';

export type TFormattedSortOrder = Exclude<TCommentsSortOrder, Order.SortOrderUndefined>;

export interface ICommentSortData {
  sortField: TCommentsSortField;
  sortOrder: TFormattedSortOrder;
}

interface IVideoByIdCommentsListProps {
  videoId: string;
  isEnabled?: boolean;
  sortData?: ICommentSortData;
  dti?: string;
}

export const VideoByIdCommentsList = (props: IVideoByIdCommentsListProps) => {
  const { videoId, isEnabled = true, sortData, dti } = props;

  const {
    comments,
    isFetching,
    ref: endPageRef,
    hasNextPage,
  } = useFetchCommentsByVideoId({ videoId, sortData });
  const { t } = useTranslation();
  const { elementsArray: CommentsList } = arrayRender({
    items: comments,
    additionalProps: {
      videoId,
      dti,
    },
    renderItem: VideoByIdComment,
    listKey: 'id',
  });

  const { skeletonsList } = renderCommentSkeletons({});

  const isInitialFetching = !comments.length && isFetching;
  const isNextPageFetching = !!comments.length && hasNextPage && isFetching;

  const skeletons = useMemo(
    () => (
      <VFlex
        gap="8"
        maxHeight={false}
        maxWidth={false}
        align="start"
        justify="start"
      >
        {skeletonsList}
      </VFlex>
    ),
    [],
  );

  if (!isEnabled) {
    return (
      <span className="text-[rgba(255,255,255,.4)] m-12 text-center block">
        {t('Video_By_Id_Comments_List_Comments_Off')}
      </span>
    );
  }

  if (isInitialFetching) {
    return skeletons;
  }

  return (
    <>
      {CommentsList}
      <div ref={endPageRef} />
      {isNextPageFetching && skeletons}
    </>
  );
};
