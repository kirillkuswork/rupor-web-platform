import { useSelector } from 'react-redux';
import { videoPlayerSelectors } from '@/redux/selectors/videoPlayerSelectors';
import { useEffect } from 'react';
import { useActions } from '@/shareds/hooks/useActions';
import { updatePlayerState } from '@/redux/slices/videoPlayer';

// Хук для обновления евентов плеера в сторе,
// значения которых не успевают обработаться во время маунта
export const useVideoEvents = () => {
  const videoPlayers = useSelector(videoPlayerSelectors.getAllPlayers);

  const { updatePlayerState: updatePlayerStateAction } = useActions({ updatePlayerState });

  useEffect(() => {
    videoPlayers.forEach(({ videoId, playerInstance }) => {
      playerInstance.subscribeToEvent('video_playback_state', (state) => {
        updatePlayerStateAction({
          videoId,
          newState: {
            videoPlaybackState: state,
          },
        });
      });
    });
  }, [videoPlayers]);
};
