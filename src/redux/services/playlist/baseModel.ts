import { VideoSharedVideoStatus } from '@/shareds/constants/videoStatus';
import { TAgeRating } from '@/shareds/types/ageRating';
import { IUserView } from '@/redux/services/channels/responseModel';

export interface IUrl {
  url?: string;
}

export interface IPlaylistWatchedVideoAuthor {
  authorId?: string;
}

export interface ISharedPlaylists {
  saved?: boolean;
  watchLater?: boolean;
}

export interface IViews {
  count: string;
  userView: IUserView;
}

export type IVideoSharedVideoStatus = typeof VideoSharedVideoStatus[keyof typeof VideoSharedVideoStatus];

export interface IPlaylistWatchedVideoChannel {
  id?: string;
  owner?: IPlaylistWatchedVideoAuthor;
  icon?: IUrl;
  title?: string;
  subscribersCount?: number;
  subscribed?: boolean;
  logoUrl?: string;
}

export interface IPlaylistWatchedVideo {
  id: string;
  title?: string;
  publishedAt?: string;
  description?: string;
  ageRating?: TAgeRating;
  thumbnailId?: string;
  status?: IVideoSharedVideoStatus;
  author?: IPlaylistWatchedVideoAuthor;
  channel?: IPlaylistWatchedVideoChannel;
  duration?: number;
  playlists?: ISharedPlaylists;
  video?: IUrl;
  thumbnail?: IUrl;
  views?: IViews;
  viewedAt?: string;
}

export type HistoryItem = IPlaylistWatchedVideo;
