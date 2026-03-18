import { AppStateType } from '@/redux/store/store';
import { createSelector } from 'reselect';
import { getHistoryVideosAdapter } from '@/redux/slices/getHistoryVideosSlice';

const geyHistoryVideosEntitiesSelectors = getHistoryVideosAdapter.getSelectors<AppStateType>(
  (state) => state.getHistoryVideos,
);

const getHistoryVideosSelector = (state: AppStateType) => geyHistoryVideosEntitiesSelectors.selectAll(state);

const getFetchParams = createSelector(
  (state: AppStateType) => state.getHistoryVideos,
  ({
    isSuccess, isError, isLoading,
  }) => ({
    isSuccess, isError, isLoading,
  }),
);

export const getHistoryVideosSelectors = {
  getHistoryVideosSelector,
  getFetchParams,
};
