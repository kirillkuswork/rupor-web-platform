import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { videoPlayerSelectors } from '@/redux/selectors/videoPlayerSelectors';

interface IUsePlayNextVideoProps {
  videoId: string;
}

export const usePlayNextVideo = (props: IUsePlayNextVideoProps) => {
  const { videoId } = props;

  const router = useRouter();

  const { videoQueue, videoInQueueData } = useSelector(selectors.videoQueueSelectors.videoQueueSelector);

  // Когда видео проигрывается в очереди
  const videoInQueuePlaybackState = videoInQueueData[videoId]?.playbackState;

  useEffect(() => {
    if (!videoInQueuePlaybackState) return;
    const videoIndexInQueue = videoQueue.indexOf(videoId);
    const nextVideoId = videoQueue[videoIndexInQueue + 1] || videoQueue[0];
    const isVideoInQueueEnded = ['ended', 'stop'].includes(videoInQueuePlaybackState);
    if (isVideoInQueueEnded && nextVideoId) {
      router.push(`${APP_PATHS_PAGES.videos}/${nextVideoId}`);
    }
  }, [videoInQueuePlaybackState]);
  //

  // Когда видео проигрывается вне очереди
  const currentPlayingVideoInstance = useSelector(videoPlayerSelectors.getCurrentPlayingVideoStateSelector);

  useEffect(() => {
    if (!currentPlayingVideoInstance) return;

    const isQueueVideo = videoQueue.includes(currentPlayingVideoInstance.videoId);

    if (isQueueVideo) return;

    const nextVideoId = videoQueue[0];

    currentPlayingVideoInstance.playerInstance.subscribeToEvent('video_ended', (isEnded) => {
      if (isEnded && nextVideoId) {
        router.push(`${APP_PATHS_PAGES.videos}/${nextVideoId}`);
      }
    });
  }, [currentPlayingVideoInstance]);
};
