import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { CommentSkeleton } from '../../ui/Comment.skeleton';

interface IRenderCommentSkeletonsProps {
  limit?: number
}

export const renderCommentSkeletons = (props: IRenderCommentSkeletonsProps) => {
  const { limit = 10 } = props;

  const skeletons = new Array(limit).fill(0);

  const { elementsArray: skeletonsList, Element: Skeletons } = arrayRender({
    items: skeletons,
    renderItem: CommentSkeleton,
  });

  return {
    skeletonsList, Skeletons,
  };
};
