import { useEffect } from 'react';
import useDebouncedCallback from '@/shareds/hooks/useDebounceCallback';
import { useCurrentPlayingVideo } from '../useCurrentPlayingVideo';
import { eventHandler } from '../../lib/metrics';

export const useVideoBreakPoint = () => {
  const { playbackState, currentTime } = useCurrentPlayingVideo();

  const debouncedEventHandler = useDebouncedCallback(eventHandler, 300);

  useEffect(() => {
    if (!playbackState || !currentTime) return;

    const roundedCurrentTime = Math.trunc(currentTime);

    const isBreakPointStates = ['pause'].includes(playbackState);

    if (!isBreakPointStates) return;

    // Тротлим, чтобы currentTime был актуальным и хендлер не дергался два раза
    debouncedEventHandler({
      eventType: 'video_breakpoint',
      payload: {
        breakpoint: roundedCurrentTime,
      },
    });
  }, [playbackState, currentTime]);
};
