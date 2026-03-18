import { AppStateType } from '@/redux/store/store';
import { createSelector } from 'reselect';
import { typedObjectEntries } from '@/shareds/lib/utils/typedObjectEntries';

const videoQueueSelector = (state: AppStateType) => state.videoQueue;

const currentPlayingVideoIdSelector = createSelector(
  videoQueueSelector,
  ({ videoInQueueData }) => typedObjectEntries(videoInQueueData).find(
    ([_, value]) => value.playbackState === 'play' || value.playbackState === 'pause',
  )?.[0],
);

export const videoQueueSelectors = {
  videoQueueSelector,
  currentPlayingVideoIdSelector,
};
