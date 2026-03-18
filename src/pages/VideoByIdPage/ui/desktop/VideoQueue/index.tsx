import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { Paper } from '@/shareds';
import { VideoQueue } from '@/widgets/VideoQueue';

export const VideoQueueWidget = () => {
  const { videoQueue } = useSelector(selectors.videoQueueSelectors.videoQueueSelector);

  if (!videoQueue.length) return null;

  return (
    <Paper className="mb-6 px-0 py-0">
      <VideoQueue />
    </Paper>
  );
};
