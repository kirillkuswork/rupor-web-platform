import { ICommentSortData } from '@/widgets/VideoByIdComments';
import { HFlex } from '@/shareds/ui/Flex';
import { CloseIcon, RightArrowIcon, StyledIcon } from 'rupor-ui-kit';
import { CommentsSortButton } from '../../common/CommentsSortButton';

interface IVideoCommentsListHeaderActionsProps {
  commentsCount?: number
  commentSort: ICommentSortData
  onChangeSort: (sort: ICommentSortData) => void
  isCommentsOpen?: boolean
  openCommentsHandler?: () => void
  closeCommentsHandler?: () => void
}

export const VideoCommentsListHeaderActions = (props: IVideoCommentsListHeaderActionsProps) => {
  const {
    commentsCount,
    commentSort,
    onChangeSort,
    isCommentsOpen,
    openCommentsHandler,
    closeCommentsHandler,
  } = props;

  const toggleCommentsHandler = isCommentsOpen ? closeCommentsHandler : openCommentsHandler;

  const actionIcon = isCommentsOpen ? <CloseIcon /> : <RightArrowIcon />;

  if (!commentsCount) {
    return null;
  }

  return (
    <HFlex maxWidth={false} gap="8">
      {isCommentsOpen && (
      <CommentsSortButton commentSort={commentSort} onChangeSort={onChangeSort} />
      )}
      <StyledIcon onClick={toggleCommentsHandler}>
        {actionIcon}
      </StyledIcon>
    </HFlex>
  );
};
