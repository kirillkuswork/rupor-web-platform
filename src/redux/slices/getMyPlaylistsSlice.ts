import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IPlaylist } from '@/redux/services/video/baseModel';
import { SortOrder } from '@/shareds/types/sortTypes';
import { Order } from '@/shareds/types/sortOrder';
import { IGetMyPlaylistsResponse } from '@/redux/services/playlist/responseModel';
import { IGetMyPlaylistsRequest } from '@/redux/services/playlist/requestModel';
import { playlistApi } from '@/redux/services';

export const fetchMyPlaylists = createAsyncThunk<IGetMyPlaylistsResponse, IGetMyPlaylistsRequest>(
  'playlistSavedPage/fetchMyPlaylists',
  // eslint-disable-next-line
  async (req, { dispatch }) => await dispatch(playlistApi.endpoints.getMyPlaylists.initiate(req, { forceRefetch: true })).unwrap(),
);

interface IGetMyPlaylistsSlice {
  sortPlaylistsBy: SortOrder
  sortVideosBy: SortOrder
  cursor?: string
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

interface IMyPlaylist extends IPlaylist {}

export const getMyPlaylistsAdapter = createEntityAdapter({
  selectId: (playlist: IMyPlaylist) => playlist.id,
});

const getMyPlaylistsSlice = createSlice({
  name: 'getMyPlaylists',
  initialState: getMyPlaylistsAdapter.getInitialState<IGetMyPlaylistsSlice>({
    sortPlaylistsBy: Order.SortOrderDesc,
    sortVideosBy: Order.SortOrderDesc,
    isLoading: false,
    isError: false,
    isSuccess: false,
  }),
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMyPlaylists.fulfilled,
      (state, action) => {
        getMyPlaylistsAdapter.addMany(state, action.payload.playlists);
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      },
    );
    builder.addCase(
      fetchMyPlaylists.pending,
      (state, action) => {
        state.isLoading = true;
        state.isError = false;
        const playlistsSortOrderReq = action.meta.arg.sortPlaylistsCreatedAt;

        const playlistVideosSortOrderReq = action.meta.arg.sortVideos;

        const cursorReq = action.meta.arg.cursor ?? '';

        const isClearedCursor = !cursorReq?.length;

        const isPlaylistsSortChanged = playlistsSortOrderReq && playlistsSortOrderReq !== state.sortPlaylistsBy;

        const isPlaylistVideosSortChanged = playlistVideosSortOrderReq && playlistVideosSortOrderReq !== state.sortVideosBy;

        if (isClearedCursor || isPlaylistsSortChanged || isPlaylistVideosSortChanged) {
          getMyPlaylistsAdapter.removeAll(state);
          state.sortPlaylistsBy = playlistsSortOrderReq!;
          state.sortVideosBy = playlistVideosSortOrderReq!;
          state.cursor = cursorReq;
        }
      },
    );
    builder.addCase(
      fetchMyPlaylists.rejected,
      (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      },
    );
  },
});

export default getMyPlaylistsSlice.reducer;
