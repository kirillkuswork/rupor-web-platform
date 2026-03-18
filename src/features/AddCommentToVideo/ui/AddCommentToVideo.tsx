import { CommentForm } from '@/entities/Comment';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useCallback } from 'react';
import {
  useLazyGetCommentsByVideoIdQuery,
  usePostCommentMutation,
} from '@/redux/services/comments';

interface IVideoCommentsListProps {
  videoId: string;
}

export const AddCommentToVideo = ({ videoId }: IVideoCommentsListProps) => {
  const { isMobile } = useIsMobile();

  const [sendComment] = usePostCommentMutation();
  const [fetchComments] = useLazyGetCommentsByVideoIdQuery();

  const onPostComment = useCallback(async (text: string) => {
    await sendComment({ videoId, text });
    fetchComments({ videoId, cursor: '' });
  }, []);

  return (
    <CommentForm
      onPostComment={onPostComment}
      authorId=""
      className={isMobile ? 'mt-5' : 'mt-[18px] mb-8 px-6 py-4 bg-tertiary'}
    />
  );
};
