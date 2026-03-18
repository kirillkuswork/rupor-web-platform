import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { useState } from 'react';
import { clearVideoQueue } from '@/redux/slices/videoQueue';
import { useActions } from '@/shareds/hooks/useActions';
import { CardsQueue } from '@/shareds/ui';
import { useChangeVideoInQueuePlaybackState } from '../model/hooks/useChangeVideoInQueuePlaybackState';
import { DeleteQueueItem } from './DeleteQueueItem';
import { VideoQueueItem } from './VideoQueueItem';
import { VideoQueueHeader } from './VideoQueueHeader';

export const VideoQueue = () => {
  const { videoQueue } = useSelector(selectors.videoQueueSelectors.videoQueueSelector);

  const { clearVideoQueue: clearVideoQueueAction } = useActions({ clearVideoQueue });

  const videoQueueFormatted = videoQueue.map((id) => ({ videoId: id }));

  const [isQueueOpen, setIsQueueOpen] = useState(true);
  const [isDeleteAllQueue, setIsDeleteAllQueue] = useState(false);

  const toggleQueueHandler = () => {
    setIsQueueOpen(!isQueueOpen);
  };

  const onDeleteQueueBtnHandler = () => {
    setIsDeleteAllQueue(true);
  };

  const onCancelDeleteBtnQueueHandler = () => {
    setIsDeleteAllQueue(false);
  };

  const onDeleteVideoQueueHandler = () => {
    clearVideoQueueAction();
  };

  useChangeVideoInQueuePlaybackState();

  const { elementsArray: videoQueueItems } = arrayRender({
    items: videoQueueFormatted,
    renderItem: VideoQueueItem,
    listKey: 'videoId',
  });

  if (!videoQueueItems.length) {
    return null;
  }

  return (
    <CardsQueue.Container data-testid="video-queue-wrapper" className="z-20 rounded-none pb-0 max-w-[calc(100vw-64px)]">
      <VideoQueueHeader
        isQueueOpen={isQueueOpen}
        toggleQueueHandler={toggleQueueHandler}
        isDeleteAllQueue={isDeleteAllQueue}
        onDeleteQueueHandler={onDeleteQueueBtnHandler}
      />
      {
        isDeleteAllQueue ? (
          <DeleteQueueItem
            cancelDeleteHandler={onCancelDeleteBtnQueueHandler}
            deleteHandler={onDeleteVideoQueueHandler}
          />
        ) : (
          <CardsQueue.Wrapper open={isQueueOpen}>
            {videoQueueItems}
          </CardsQueue.Wrapper>
        )
      }
    </CardsQueue.Container>
  );
};
