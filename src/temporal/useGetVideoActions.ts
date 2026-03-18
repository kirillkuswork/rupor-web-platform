import { IGetActions, TVideoAction } from '@/entities/Video';
import { useAddReportToVideoOption } from '@/features/AddReportToVideo';
import {
  useAddVideoToSavedOption,
  useAddVideoToWatchLaterOption,
  useDeleteVideoFromPlaylistOption,
} from '@/features/AddVideoToPlaylist';
import { useAddVideoToQueueOption } from '@/features/AddVideoToQueue';
import { useMoveVideoToAnotherPlaylist } from '@/features/MoveVideoToAnotherPlaylist';
import { useDeleteVideoFromHistoryOption } from '@/features/DeleteVideoFromHistory';

export type TVideoActions = 'addToWatchLater' | 'addToQueue' | 'addToSaved' | 'addReportToVideo' | 'moveToAnotherPlaylist' | 'deleteVideoFromPlaylist' | 'deleteVideoFromHistory';

const mapActionToVideoAction: Record<TVideoActions, (param: IGetActions) => TVideoAction> = {
  addReportToVideo: useAddReportToVideoOption,
  addToQueue: useAddVideoToQueueOption,
  addToSaved: useAddVideoToSavedOption,
  addToWatchLater: useAddVideoToWatchLaterOption,
  moveToAnotherPlaylist: useMoveVideoToAnotherPlaylist,
  deleteVideoFromPlaylist: useDeleteVideoFromPlaylistOption,
  deleteVideoFromHistory: useDeleteVideoFromHistoryOption,
};

interface IUseGetVideoActions {
  actionsList: TVideoActions[]
}

export const useGetVideoActions = (props: IUseGetVideoActions) => ({ videoData, changeState }: IGetActions): TVideoAction[] => {
  const {
    actionsList,
  } = props;

  return actionsList.map((action) => mapActionToVideoAction[action]({ videoData, changeState }));
};
