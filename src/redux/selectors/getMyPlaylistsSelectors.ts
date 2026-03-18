import { getMyPlaylistsAdapter } from '@/redux/slices/getMyPlaylistsSlice';
import { AppStateType } from '@/redux/store/store';
import { createSelector } from 'reselect';

const myPlaylistsEntitiesSelectors = getMyPlaylistsAdapter.getSelectors<AppStateType>(
  (state) => state.getMyPlaylists,
);

const getMyPlaylistsSelector = (state: AppStateType) => myPlaylistsEntitiesSelectors.selectAll(state);

const getFetchParams = createSelector(
  (state: AppStateType) => state.getMyPlaylists,
  ({
    sortPlaylistsBy, sortVideosBy, isSuccess, isError, isLoading,
  }) => ({
    sortPlaylistsBy, sortVideosBy, isSuccess, isError, isLoading,
  }),
);

export const getMyPlaylistsSelectors = {
  getMyPlaylistsSelector,
  getFetchParams,
};
