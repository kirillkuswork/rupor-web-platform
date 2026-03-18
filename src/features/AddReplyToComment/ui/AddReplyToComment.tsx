import { CommentForm } from '@/entities/Comment';
import { useLazyGetCommentRepliesQuery, usePostCommentReplyMutation } from '@/redux/services/comments';
import { useCallback } from 'react';

interface IAddReplyToCommentProps {
  commentId: string;
  setIsRepliesOpened: (isRepliesOpened: boolean) => void;
  dti?: string;
  authorId?: string;
}

export const AddReplyToComment = ({ commentId, setIsRepliesOpened, dti, authorId }: IAddReplyToCommentProps) => {
  const [sendCommentReply] = usePostCommentReplyMutation();
  const [fetchReplies] = useLazyGetCommentRepliesQuery();

  const onPostComment = useCallback(async (text: string) => {
    await sendCommentReply({ commentId, text });
    fetchReplies({ commentId });
    setIsRepliesOpened(true);
  }, []);

  return <CommentForm dti={dti} authorId={authorId} onPostComment={onPostComment} />;
};
