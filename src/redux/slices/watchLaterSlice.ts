import { IVideoCardWithDetailsProps } from '@/entities/Video';
import { createSlice } from '@reduxjs/toolkit';
import { playlistApi } from '../services';

interface IAppState {
  watchLaterList: IVideoCardWithDetailsProps[];
  watchLaterTotalCount: number;
}

const initialState: IAppState = {
  watchLaterList: [],
  watchLaterTotalCount: 0,
};

const watchLaterSlice = createSlice({
  name: 'watchLater',
  initialState,
  reducers: {
    setWatchLaterList: (state, action) => {
      state.watchLaterList = action.payload;
    },
    setWatchLaterTotalCount: (state, action) => {
      state.watchLaterTotalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      playlistApi.endpoints.deleteVideoFromWatchLaterPlaylist.matchFulfilled,
      (state, action) => {
        const videoId = action?.meta?.arg?.originalArgs?.videoId;
        if (videoId) {
          state.watchLaterList = state.watchLaterList.filter((video) => video.videoId !== videoId);
        }
      },
    );
  },
});

const {
  setWatchLaterList,
  setWatchLaterTotalCount,
} = watchLaterSlice.actions;

export const watchLaterSliceActions = {
  setWatchLaterList,
  setWatchLaterTotalCount,
};

export default watchLaterSlice.reducer;
