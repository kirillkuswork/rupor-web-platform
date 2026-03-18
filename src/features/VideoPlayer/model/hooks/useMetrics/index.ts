import { useSendVideoMetrics } from './useSendVideoMetrics';
import { useVideoDepth } from './useVideoDepth';
import { useVideoViewed } from './useVideoViewed';
import { useVideoBreakPoint } from './useVideoBreakPoint';

export const useMetrics = () => {
  useVideoDepth();
  useVideoViewed();
  useVideoBreakPoint();
  useSendVideoMetrics();
};
