import { baseApi } from '@/redux/services/baseApi';
import { authApi, faqApi } from '@/redux/services';
// eslint-disable-next-line import/no-cycle
import videoQueueSlice from '@/redux/slices/videoQueue';
import videoPlayerSlice from '@/redux/slices/videoPlayer';
import commentsSlice from '@/redux/slices/commentsSlice';
import headerSlice from '@/redux/slices/headerSlice';
import appSlice from '@/redux/slices/appSlice';
import playlistSlice from '@/redux/slices/playlistSlice';
import userSlice from '@/redux/slices/userSlice';
import recommendationListSlice from '@/redux/slices/recommendationListSlice';
import getMyPlaylistsSlice from '@/redux/slices/getMyPlaylistsSlice';
import getHistoryVideosSlice from '@/redux/slices/getHistoryVideosSlice';
import watchLaterSlice from '@/redux/slices/watchLaterSlice';
import { metricsApi } from '@/redux/services/metrics';

export const reducersList = {
  header: headerSlice,
  app: appSlice,
  user: userSlice,
  playlist: playlistSlice,
  videoQueue: videoQueueSlice,
  videoPlayer: videoPlayerSlice,
  comments: commentsSlice,
  getMyPlaylists: getMyPlaylistsSlice,
  recommendationList: recommendationListSlice,
  getHistoryVideos: getHistoryVideosSlice,
  watchLater: watchLaterSlice,
  [authApi.reducerPath]: authApi.reducer,
  [faqApi.reducerPath]: faqApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [metricsApi.reducerPath]: metricsApi.reducer,
};
