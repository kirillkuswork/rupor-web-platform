import { recommendationListSelectors } from './recommendationListSelectors';
import { getHistoryVideosSelectors } from './getHistoryVideosSelectors';
import { getMyPlaylistsSelectors } from './getMyPlaylistsSelectors';
import { videoPlayerSelectors } from './videoPlayerSelectors';
import { appSelector } from './appSelectors';
import { headerSelector } from './headerSelectors';
import { userSelector } from './userSelectors';
import { playlistSelector } from './playlistSelectors';
import { videoQueueSelectors } from './videoQueueSelectors';
import { commentsSelector } from './commentsSelectors';
import { watchLaterSelectors } from './watchLaterSelectors';

export const selectors = {
  headerSelector,
  appSelector,
  userSelector,
  playlistSelector,
  videoQueueSelectors,
  videoPlayerSelectors,
  commentsSelector,
  recommendationListSelectors,
  getMyPlaylistsSelectors,
  getHistoryVideosSelectors,
  watchLaterSelectors,
};
