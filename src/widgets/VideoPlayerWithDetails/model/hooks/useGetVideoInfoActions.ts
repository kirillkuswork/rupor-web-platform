import { IVideoCardWithDetailsProps, TVideoAction } from '@/entities/Video';
import { useAddReportToVideoOption } from '@/features/AddReportToVideo';
import { useAddTechnicalReportOption } from '@/features/AddTechnicalReport';

export const useGetVideoInfoActions = (video: IVideoCardWithDetailsProps): TVideoAction[] => [
  useAddReportToVideoOption({ videoData: video }),
  useAddTechnicalReportOption({ videoData: video }),
];
