import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useEffect } from 'react';
import { setIsQueueMounted } from '@/redux/slices/videoQueue';
import { BreakpointRender } from '@/shareds/lib/components/BreakpointRender';
import { VideoQueueHeaderMobile } from '@/widgets/VideoQueue/ui/VideoQueueHeader/VideoQueueHeaderMobile';
import { VideoQueueHeaderDesktop } from '@/widgets/VideoQueue/ui/VideoQueueHeader/VideoQueueHeaderDesktop';

interface IVideoQueueHeaderProps {
  isQueueOpen: boolean;
  toggleQueueHandler: () => void;
  isDeleteAllQueue: boolean
  onDeleteQueueHandler: () => void;
}

export const VideoQueueHeader = (props: IVideoQueueHeaderProps) => {
  const {
    isQueueOpen, toggleQueueHandler, onDeleteQueueHandler, isDeleteAllQueue,
  } = props;

  const dispatch = useDispatch();

  const { videoQueue } = useSelector(selectors.videoQueueSelectors.videoQueueSelector);
  const currentPlayingVideoId = useSelector(selectors.videoQueueSelectors.currentPlayingVideoIdSelector);
  const currentVideoIndex = currentPlayingVideoId ? videoQueue.indexOf(currentPlayingVideoId) + 1 : 1;
  const videoQueueLength = videoQueue?.length;

  useEffect(() => {
    // Определяем вмонтирована ли очередь в dom
    dispatch(setIsQueueMounted(true));
    return () => {
      dispatch(setIsQueueMounted(false));
    };
  }, []);

  return (
    <BreakpointRender
      mobile={(
        <VideoQueueHeaderMobile
          currentVideoIndex={currentVideoIndex}
          videoQueueLength={videoQueueLength}
          onDeleteQueueHandler={onDeleteQueueHandler}
        />
      )}
      desktop={(
        <VideoQueueHeaderDesktop
          currentVideoIndex={currentVideoIndex}
          videoQueueLength={videoQueueLength}
          onDeleteQueueHandler={onDeleteQueueHandler}
          toggleQueueHandler={toggleQueueHandler}
          isDeleteAllQueue={isDeleteAllQueue}
          isQueueOpen={isQueueOpen}
        />
      )}
    />
  );
};
