import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IPlaylistWatchedVideo } from '@/redux/services/playlist/baseModel';
import { playlistApi } from '@/redux/services';

interface IGetHistoryVideosSlice {
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
}

export const getHistoryVideosAdapter = createEntityAdapter({
  selectId: (video: IPlaylistWatchedVideo) => video.id,
});

const getHistoryVideosSlice = createSlice({
  name: 'getHistoryVideos',
  initialState: getHistoryVideosAdapter.getInitialState<IGetHistoryVideosSlice>({
    isLoading: false,
    isError: false,
    isSuccess: false,
  }),
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      playlistApi.endpoints.getHistoryVideos.matchFulfilled,
      (state, action) => {
        getHistoryVideosAdapter.addMany(state, action.payload.videos);
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      },
    );
    builder.addMatcher(
      playlistApi.endpoints.getHistoryVideos.matchPending,
      (state, action) => {
        state.isLoading = true;
        state.isError = false;

        const cursorReq = action.meta.arg.originalArgs.cursor ?? '';

        const isClearedCursor = !cursorReq?.length;

        if (!isClearedCursor) return;

        getHistoryVideosAdapter.removeAll(state);
      },
    );
    builder.addMatcher(
      playlistApi.endpoints.getHistoryVideos.matchRejected,
      (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      },
    );
  },
});

export default getHistoryVideosSlice.reducer;
