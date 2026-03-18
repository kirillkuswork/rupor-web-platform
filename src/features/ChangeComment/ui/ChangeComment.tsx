import { useCallback } from 'react';
import { CommentChangeForm } from '@/entities/Comment/ui/CommentChangeForm';
import { usePatchCommentMutation } from '@/redux/services/comments';

interface IAddReplyToCommentProps {
  commentId: string;
  setIsRedactorOpened: (param: boolean) => void;
  dti?: string;
}

export const ChangeComment = ({
  commentId,
  setIsRedactorOpened,
  dti,
}: IAddReplyToCommentProps) => {
  const [poatchComment] = usePatchCommentMutation();
  const onPostComment = useCallback(async (text: string) => {
    poatchComment({ commentId, text });
  }, []);

  return (
    <CommentChangeForm
      dti={dti}
      onCloseCommentForm={setIsRedactorOpened}
      onPostComment={onPostComment}
    />
  );
};
