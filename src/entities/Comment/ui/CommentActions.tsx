import { DesktopDropdown } from '@/shareds/ui/Dropdown';
import { Comment as UIKitComment } from 'rupor-ui-kit';
import { TVideoAction } from '@/entities/Video';

interface ICommentActionsProps {
  commentActions?: TVideoAction[];
  className?: string;
  dti?: string;
}

export const CommentActions = (props: ICommentActionsProps) => {
  const { commentActions, className, dti } = props;

  if (!commentActions) return null;

  return (
    <UIKitComment.DropdownMenu data-testid={`${dti}-dropdown-button`} className={className}>
      <DesktopDropdown dti={`${dti}-comment-actions-wrapper`} options={commentActions} />
    </UIKitComment.DropdownMenu>
  );
};
