import { useSelector } from 'react-redux';
import { videoPlayerSelectors } from '@/redux/selectors/videoPlayerSelectors';
import { useEffect, useMemo, useState } from 'react';
import { TPlaybackStates } from '@/entities/Video';

export const useCurrentPlayingVideo = () => {
  const currentPlayingVideo = useSelector(videoPlayerSelectors.getCurrentPlayingVideoStateSelector);

  const [playerParams, setPlayerParams] = useState<{
    videoId?: string
    currentTime?: number,
    duration?: number,
    playbackState?: TPlaybackStates
  }>({});

  useEffect(() => {
    if (!currentPlayingVideo) return;

    const { playerInstance, videoId, videoPlaybackState } = currentPlayingVideo;

    playerInstance.subscribeToEvent('time_update', ({ currentTime, duration }) => {
      setPlayerParams((prevState) => ({ ...prevState, currentTime, duration }));
    });

    setPlayerParams((prevState) => ({ ...prevState, videoId, playbackState: videoPlaybackState }));

    return () => setPlayerParams({});
  }, [currentPlayingVideo]);

  return useMemo(() => playerParams, [playerParams]);
};
