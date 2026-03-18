import { TAgeRating } from '@/shareds/types/ageRating';
import { SortOrder } from '@/shareds/types/sortTypes';

export interface IChannelsResponse {
  channels: IChannel[];
  pagination: IPagination;
}

export interface IChannel {
  id: string;
  ownerId: string;
  subscribers: number;
  subscribed: boolean;
  categories: ICategory[];
  title: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  iconUrl: string;
  videos: IVideo[];
}

export interface ICategory {
  id: number;
  title: string;
}

export interface IVideo {
  id: string;
  duration: number;
  ageRating: TAgeRating;
  title: string;
  views: IViews;
  thumbnail: IThumbnail;
  playlists: IPlaylists;
  publishedAt: string;
}

export interface IViews {
  count: string;
  userView: IUserView;
}

export interface IUserView {
  breakpoint: number;
}

export interface IThumbnail {
  url: string;
}

export interface IPlaylists {
  saved: boolean;
  watchLater: boolean;
}

export interface IPagination {
  cursorFields: ICursorFields;
  limit: number;
  total: number;
  cursor: string;
}

export interface ICursorFields {
  createdAt: string;
  lastChannelId: string;
  sortCreatedAt: SortOrder;
}

export interface IGetChannelVideosByIdResponse {
  channel: IChannel;
  videos: IVideo[];
  pagination: Omit<IPagination, 'cursorFields'>;
}

export interface ISubscribeToChannelResponse {
  subscribers: number;
}
