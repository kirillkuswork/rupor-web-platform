/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoCardWithDetailsProps, TPlaybackStates } from '@/entities/Video';
import { playlistApi, videoApi } from '../services';
import { IGetVideoByIdResponse } from '../services/video/responseModel';

export type TQueueSteps = 'initial' | 'added' | 'watched' | 'active' | 'delete';

export interface IQueueVideo extends Omit<IVideoCardWithDetailsProps, 'getVideoActions'> {
  playbackState: TPlaybackStates
  queueStep: {
    previous?: TQueueSteps
    current: TQueueSteps
  }
}

interface IVideoQueueSliceState {
  videoInQueueData: Record<string, IQueueVideo>;
  videoQueue: string[];
  isQueueMounted: boolean;
  isVideoByIdSaved: boolean;
  isVideoByIdWatchLater: boolean;
}

const initialState: IVideoQueueSliceState = {
  videoInQueueData: {},
  videoQueue: [],
  isQueueMounted: false,
  isVideoByIdSaved: false,
  isVideoByIdWatchLater: false,
};

const videoQueueSlice = createSlice({
  name: '@/features/videoQueue',
  initialState,
  reducers: {
    addVideoToQueue: (state, { payload }: PayloadAction<IVideoCardWithDetailsProps>) => {
      const { videoId, getVideoActions, ...otherData } = payload;
      state.videoQueue.push(videoId);
      state.videoInQueueData = {
        ...state.videoInQueueData,
        [videoId]: {
          ...otherData,
          videoId,
          queueStep: {
            current: 'added',
          },
          playbackState: 'initial',
        },
      };
    },
    removeVideoFromQueue: (state, { payload }: PayloadAction<string>) => {
      state.videoQueue = state.videoQueue.filter((el) => el !== payload);
      delete state.videoInQueueData[payload];
    },
    changeVideoQueueStep: (state, { payload }: PayloadAction<{ videoId: string, step: TQueueSteps }>) => {
      const { videoId, step } = payload;
      if (!state.videoInQueueData[videoId]) return;
      const { queueStep } = state.videoInQueueData[videoId];
      state.videoInQueueData[videoId].queueStep = {
        current: step,
        previous: queueStep.current,
      };
    },
    changeVideoInQueuePlaybackState: (
      state,
      { payload }: PayloadAction<{ videoId: string, playbackState: TPlaybackStates }>,
    ) => {
      const { videoId, playbackState } = payload;
      if (!state.videoInQueueData[videoId]) return;
      state.videoInQueueData[videoId].playbackState = playbackState;
    },
    clearVideoQueue: (state) => {
      state.videoQueue = [];
      state.videoInQueueData = {};
    },
    setIsQueueMounted: (state, { payload }: PayloadAction<boolean>) => {
      state.isQueueMounted = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      videoApi.endpoints.getVideoById.matchFulfilled,
      (state, { payload }: PayloadAction<IGetVideoByIdResponse>) => {
        state.isVideoByIdSaved = payload.video.playlists?.saved || false;
        state.isVideoByIdWatchLater = payload.video.playlists?.watchLater || false;
      },
    );
    builder.addMatcher(
      playlistApi.endpoints.addVideoToPersonalPlaylist.matchFulfilled,
      (state) => {
        state.isVideoByIdSaved = true;
      },
    );
    builder.addMatcher(
      playlistApi.endpoints.deleteVideoFromPersonalPlaylist.matchFulfilled,
      (state) => {
        state.isVideoByIdSaved = false;
      },
    );
    builder.addMatcher(
      playlistApi.endpoints.addVideoToWatchLaterPlaylist.matchFulfilled,
      (state) => {
        state.isVideoByIdWatchLater = true;
      },
    );
    builder.addMatcher(
      playlistApi.endpoints.deleteVideoFromWatchLaterPlaylist.matchFulfilled,
      (state) => {
        state.isVideoByIdWatchLater = false;
      },
    );
  },
});

export const {
  addVideoToQueue,
  removeVideoFromQueue,
  changeVideoQueueStep,
  clearVideoQueue,
  changeVideoInQueuePlaybackState,
  setIsQueueMounted,
} = videoQueueSlice.actions;

export default videoQueueSlice.reducer;
