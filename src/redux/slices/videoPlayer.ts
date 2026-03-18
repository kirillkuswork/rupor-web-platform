import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoPlayerInstance, TPlaybackStates } from '@/entities/Video';

export interface IPlayerInstance {
  videoId: string;
  playerInstance: IVideoPlayerInstance;
  videoPlaybackState: TPlaybackStates;
}

type TUpdatePlayerState = Omit<IPlayerInstance, 'videoId' | 'playerInstance'>;

export const playerAdapter = createEntityAdapter({
  selectId: (player: IPlayerInstance) => player.videoId,
});

const videoPlayerSlice = createSlice({
  name: '@/features/videoPlayer',
  initialState: playerAdapter.getInitialState(),
  reducers: {
    updatePlayerState: (
      state,
      { payload }: PayloadAction<{ videoId: string; newState: TUpdatePlayerState }>,
    ) => {
      playerAdapter.updateOne(state, {
        id: payload.videoId,
        changes: payload.newState,
      });
    },
    addPlayer: (
      state,
      { payload }: PayloadAction<{ videoId: string; playerInstance: IVideoPlayerInstance }>,
    ) => {
      playerAdapter.addOne(state, {
        videoId: payload.videoId,
        videoPlaybackState: 'initial',
        playerInstance: payload.playerInstance,
      });
    },
    removePlayer: (state, { payload }: PayloadAction<{ videoId: string }>) => {
      playerAdapter.removeOne(state, payload.videoId);
    },
  },
});

export const {
  updatePlayerState,
  addPlayer,
  removePlayer,
} = videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
