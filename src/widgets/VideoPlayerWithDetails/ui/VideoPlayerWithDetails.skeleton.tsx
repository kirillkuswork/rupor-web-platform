import { Skeleton } from 'rupor-ui-kit';
import { Paper } from '@/shareds';

export const VideoPlayerWithDetailsSkeleton = () => (
  <>
    <Paper>
      <Skeleton template="videoPlayerSkeleton" />
    </Paper>
    <Paper className="px-6 my-6">
      <Skeleton template="videoFooter" />
    </Paper>
  </>
);
