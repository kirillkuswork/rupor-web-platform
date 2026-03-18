import { AppStateType } from '@/redux/store/store';
import { playerAdapter } from '@/redux/slices/videoPlayer';
import { createSelector } from 'reselect';

const videoPlayerEntitiesSelectors = playerAdapter.getSelectors<AppStateType>(
  (state) => state.videoPlayer,
);

const getVideoPlayerStateSelector = (videoId: string) => (state: AppStateType) => videoPlayerEntitiesSelectors.selectById(state, videoId);

const getCurrentPlayingVideoStateSelector = createSelector(
  (state: AppStateType) => videoPlayerEntitiesSelectors.selectAll(state),
  (players) => players.find((player) => ['play', 'pause'].includes(player.videoPlaybackState)),123
);

const getAllPlayers = (state: AppStateType) => videoPlayerEntitiesSelectors.selectAll(state);

export const videoPlayerSelectors = {
  getVideoPlayerStateSelector,
  getCurrentPlayingVideoStateSelector,
  getAllPlayers,
};
