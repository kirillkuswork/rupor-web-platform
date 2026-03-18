import { useDispatch, useSelector } from 'react-redux';
import { videoPlayerSelectors } from '@/redux/selectors/videoPlayerSelectors';
import { useEffect } from 'react';
import { changeVideoInQueuePlaybackState, changeVideoQueueStep } from '@/redux/slices/videoQueue';

export const useChangeVideoInQueuePlaybackState = () => {
  const video = useSelector(videoPlayerSelectors.getCurrentPlayingVideoStateSelector);

  const dispatch = useDispatch();

  useEffect(() => () => {
    if (video?.videoPlaybackState !== 'ended' && video?.videoId) {
      dispatch(changeVideoInQueuePlaybackState({ videoId: video?.videoId, playbackState: 'initial' }));
      dispatch(changeVideoQueueStep({ videoId: video?.videoId, step: 'initial' }));
    }
  }, [video]);
};
