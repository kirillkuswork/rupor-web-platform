import { useSelector } from 'react-redux';
import { userSelector } from '@/redux/selectors/userSelectors';
import { useEffect, useRef } from 'react';
import { TIME_FOR_IS_WATCHED } from '@/features/VideoPlayer/model/const/metrics';
import { useCurrentPlayingVideo } from '../useCurrentPlayingVideo';
import { eventHandler } from '../../lib/metrics';

export const useVideoViewed = () => {
  const playerParams = useCurrentPlayingVideo();
  const { user } = useSelector(userSelector);

  const { id: userId } = user;

  const isAlreadyViewedRef = useRef<boolean>();

  useEffect(() => {
    if (!playerParams.currentTime || !playerParams.duration || !playerParams.videoId) return;

    const { currentTime, duration } = playerParams;

    const roundedCurrentTime = Math.trunc(currentTime);

    const isVideoViewed = duration <= TIME_FOR_IS_WATCHED || roundedCurrentTime > TIME_FOR_IS_WATCHED;

    const isAlreadyViewed = isAlreadyViewedRef.current;

    if (!isVideoViewed || isAlreadyViewed) return;

    isAlreadyViewedRef.current = true;

    eventHandler({ eventType: 'video_viewed', payload: { video_id: playerParams.videoId } });
  }, [playerParams, userId]);
};
