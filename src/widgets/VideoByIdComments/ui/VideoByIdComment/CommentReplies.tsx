import { Comment, formatCount } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { renderCommentSkeletons } from '@/entities/Comment';
import { VFlex } from '@/shareds/ui/Flex';
import { usePostCommentReactionMutation } from '@/redux/services/comments';
import { IReactionPostHandlerParams } from '@/features/AddReplyToComment/utils/types';
import { useFormatCountTranslations } from '@/shareds/hooks/useFormatCountTranslations';
import { VideoByIdComment } from './VideoByIdComment';
import { useGetCommentReplies } from '../../model/hooks/useGetCommentReplies';

interface ICommentRepliesProps {
  commentId: string
  repliesCount?: number
  videoId: string
  setIsRepliesOpened: (isRepliesOpen: boolean) => void;
  isRepliesOpened: boolean;
  dti?: string;
}

export const CommentReplies = (props: ICommentRepliesProps) => {
  const {
    commentId, repliesCount = 0, videoId, setIsRepliesOpened, isRepliesOpened, dti,
  } = props;

  const { t } = useTranslation();
  const { answersDeclensions } = useFormatCountTranslations();

  const {
    isFetching, commentReplies, ref, hasNextPage,
  } = useGetCommentReplies({ commentId, isRepliesOpened });

  const openRepliesHandler = async () => {
    setIsRepliesOpened(true);
  };

  const closeRepliesHandler = async () => {
    setIsRepliesOpened(false);
  };

  const [postReaction] = usePostCommentReactionMutation();
  const handlePostReaction = useCallback(
    ({ commentId: replyId, emotionId }: IReactionPostHandlerParams) => {
      postReaction({ commentId: replyId, emotionId });
    },
    [postReaction],
  );

  const isInitialFetching = !commentReplies.length && isFetching;
  const isNextPageFetching = !!commentReplies.length && hasNextPage && isFetching;

  const toggleBtnHandler = isRepliesOpened ? closeRepliesHandler : openRepliesHandler;

  const { Element: RepliesList } = arrayRender({
    items: commentReplies,
    renderItem: VideoByIdComment,
    listKey: 'id',
    additionalProps: {
      videoId,
      dti,
    },
    handlers: {
      handlePostReaction,
    },
  });

  const { skeletonsList } = renderCommentSkeletons({ limit: 5 });

  const skeletons = (
    <VFlex gap="8" maxHeight={false} maxWidth={false} align="start" justify="start">
      {skeletonsList}
    </VFlex>
  );

  const repliesList = (
    <>
      <RepliesList />
      <div ref={ref} />
      {isNextPageFetching && skeletons}
    </>
  );

  const Replies = isInitialFetching ? skeletons : repliesList;

  return (
    <>
      <Comment.ShowMoreButton
        data-testid={`${dti}-${commentId}-hide-show-childes`}
        onClick={toggleBtnHandler}
        selected={isRepliesOpened}
      >
        {isRepliesOpened
          ? `${t('Common_Hide')} ${formatCount(repliesCount, answersDeclensions)}`
          : `${t('Common_Show')} ${formatCount(repliesCount, answersDeclensions)}`}
      </Comment.ShowMoreButton>
      {isRepliesOpened && Replies}
    </>
  );
};
