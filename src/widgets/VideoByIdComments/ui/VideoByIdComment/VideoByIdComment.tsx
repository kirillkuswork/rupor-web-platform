import { IComment } from '@/redux/services/comments/responseModel';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { linkify } from '@/shareds/lib/utils/linkify';
import { Comment as UIKitComment } from 'rupor-ui-kit';
import { AddReplyToComment } from '@/features/AddReplyToComment';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { CommentActions } from '@/entities/Comment';
import { ChangeComment } from '@/features/ChangeComment';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { AddReactionToComment } from '@/features/AddReactionToComment';
import { formatDateAgo } from '@/shareds/lib/utils/formatDateAgo';
import { useGetCommentsActions } from '../../model/hooks/useCommentsActions';
import { CommentReplies } from './CommentReplies';

export interface IVideoByIdComment extends IComment {
  videoId: string;
  dti: string;
}

export const VideoByIdComment = (props: IVideoByIdComment) => {
  const {
    author,
    publishedAt,
    text,
    videoId,
    reactions,
    id,
    hasSubComments,
    subCommentsCount,
    replyTo,
    dti,
  } = props;

  const { user } = useSelector(selectors.userSelector);

  const [isRepliesOpened, setIsRepliesOpened] = useState(false);

  const { t } = useTranslation();

  const [isChangeCommentOpened, setIsChangeCommentOpened] = useState(false);

  const formattedCommentText = text?.length && videoId ? linkify(text, videoId) : '';

  const [isReplyFormOpened, setIsReplyFormOpened] = useState(false);
  const isCommentActionsVisible = user.id === author?.id && !isChangeCommentOpened;

  const toggleReplyForm = () => {
    setIsReplyFormOpened(!isReplyFormOpened);
  };

  const commentActions = useGetCommentsActions({
    setIsChangeCommentOpened,
    commentId: id,
    replyTo,
  });

  if (!id) return null;

  return (
    <UIKitComment.Container data-testid={`${dti}-${id}-author-name_${author?.id}`} id={id}>
      <UIKitComment.Avatar
        dti={`${dti}-${id}-author-name_${author?.id}-avatar`}
        size={24}
        src={imgProxy({ imgUrl: author?.avatar?.url })}
      />
      <UIKitComment.Wrapper>
        {isChangeCommentOpened ? (
          <ChangeComment
            dti={`${dti}-${id}`}
            setIsRedactorOpened={setIsChangeCommentOpened}
            commentId={id}
          />
        ) : (
          <>
            <UIKitComment.Title data-testid={`${dti}-${id}-author-name-title`}>
              {author?.name}
            </UIKitComment.Title>
            <UIKitComment.Date data-testid={`${dti}-${id}-date`}>
              {formatDateAgo(publishedAt as string, t)}
            </UIKitComment.Date>
            <UIKitComment.Description dti={`${dti}-${id}-text`}>
              {formattedCommentText}
            </UIKitComment.Description>
          </>
        )}
        {!isChangeCommentOpened && (
          <UIKitComment.Toolbar>
            <UIKitComment.Button>
              <AddReactionToComment
                dti={`${dti}-${id}`}
                reactions={reactions}
                commentId={id}
              />
            </UIKitComment.Button>
            <UIKitComment.Button
              data-testid={`${dti}-${id}-reply-open-button_${author?.id}`}
              onClick={toggleReplyForm}
            >
              {t('Common_Reply')}
            </UIKitComment.Button>
          </UIKitComment.Toolbar>
        )}
        {isReplyFormOpened && (
          <AddReplyToComment
            dti={`${dti}-${id}-reply`}
            authorId={author?.id}
            setIsRepliesOpened={setIsRepliesOpened}
            commentId={replyTo || id}
          />
        )}
        {hasSubComments && (
          <CommentReplies
            dti={dti}
            commentId={id}
            repliesCount={subCommentsCount}
            videoId={videoId}
            setIsRepliesOpened={setIsRepliesOpened}
            isRepliesOpened={isRepliesOpened}
          />
        )}
      </UIKitComment.Wrapper>
      {isCommentActionsVisible && (
        <CommentActions dti={`${dti}-${id}`} commentActions={commentActions} />
      )}
    </UIKitComment.Container>
  );
};
