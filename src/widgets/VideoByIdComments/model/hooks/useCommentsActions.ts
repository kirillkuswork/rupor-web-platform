import { TVideoAction } from '@/entities/Video';
import { useChangeComment } from '@/features/ChangeComment';
import { useDeleteComment } from '@/features/DeleteComment';

export const useGetCommentsActions = ({
  setIsChangeCommentOpened,
  commentId,
  replyTo,
}: {
  setIsChangeCommentOpened: (param: boolean) => void;
  commentId: string;
  replyTo?: string;
}): TVideoAction[] => [
  useChangeComment(setIsChangeCommentOpened),
  useDeleteComment(commentId, replyTo),
];
