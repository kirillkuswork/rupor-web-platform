import { useEffect, useRef } from 'react';
import { IMapEventTypeToPayload } from '@/redux/services/metrics/requestModel';
import { useSelector } from 'react-redux';
import { userSelector } from '@/redux/selectors/userSelectors';
import { useCurrentPlayingVideo } from '../useCurrentPlayingVideo';
import { eventHandler } from '../../lib/metrics';

export const useVideoDepth = () => {
  const playerParams = useCurrentPlayingVideo();
  const { user } = useSelector(userSelector);

  const { id: userId } = user;

  const prevSendedCurrentTimeRef = useRef<number>();

  useEffect(() => {
    if (!playerParams.currentTime || !playerParams.duration || !playerParams.videoId) return;

    const { currentTime, duration, videoId } = playerParams;

    const roundedDuration = Math.round(duration);

    const roundedCurrentTime = Math.trunc(currentTime);

    const isEquals = prevSendedCurrentTimeRef.current === roundedCurrentTime;

    if (isEquals) return;

    prevSendedCurrentTimeRef.current = roundedCurrentTime;

    const payload: IMapEventTypeToPayload['video_depth'] = {
      video_total_duration: roundedDuration,
      video_timeline_current_at: roundedCurrentTime,
      video_point_time: 1,
      video_id: videoId,
    };

    if (userId) {
      payload.user_id = userId;
    }

    eventHandler({ eventType: 'video_depth', payload });
  }, [playerParams, userId]);
};
