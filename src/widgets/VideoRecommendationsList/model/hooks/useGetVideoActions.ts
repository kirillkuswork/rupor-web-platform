import { TGetActions, TVideoAction } from '@/entities/Video';
import { useAddVideoToSavedOption, useAddVideoToWatchLaterOption } from '@/features/AddVideoToPlaylist';
import { useAddVideoToQueueOption } from '@/features/AddVideoToQueue';
import { useAddReportToVideoOption } from '../../../../features/AddReportToVideo';

export const useGetVideoActions: TGetActions = ({ videoData, changeState }): TVideoAction[] => [
  useAddVideoToWatchLaterOption({ videoData, changeState }),
  useAddVideoToQueueOption({ videoData, changeState }),
  useAddVideoToSavedOption({ videoData, changeState }),
  useAddReportToVideoOption({ videoData, changeState }),
];
