import { TPlaybackStates } from '@/entities/Video';
import { useDispatch, useSelector } from 'react-redux';
import { videoPlayerSelectors } from '@/redux/selectors/videoPlayerSelectors';
import { useEffect } from 'react';
import { changeVideoInQueuePlaybackState, changeVideoQueueStep, TQueueSteps } from '@/redux/slices/videoQueue';

const mapPlaybackStateToQueueStep: Record<TPlaybackStates, TQueueSteps> = {
  play: 'active',
  pause: 'active',
  ended: 'watched',
  stop: 'watched',
  initial: 'initial',
};

export const useSetPlaybackStateToVideoQueue = () => {
  const videoPlayers = useSelector(videoPlayerSelectors.getAllPlayers);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!videoPlayers) return;
    videoPlayers.forEach((videoPlayer) => {
      const { videoId, playerInstance, videoPlaybackState } = videoPlayer;
      if (videoPlaybackState) {
        dispatch(changeVideoInQueuePlaybackState({ videoId, playbackState: videoPlaybackState }));
        dispatch(changeVideoQueueStep({ videoId, step: mapPlaybackStateToQueueStep[videoPlaybackState] }));
      }
      playerInstance.subscribeToEvent(('video_playback_state'), (state) => {
        dispatch(changeVideoInQueuePlaybackState({ videoId, playbackState: state }));
        dispatch(changeVideoQueueStep({ videoId, step: mapPlaybackStateToQueueStep[state] }));
      });
    });
  }, [videoPlayers]);
};
