import { TAgeRating } from '@/shareds/types/ageRating';

export interface ICategoryWithVideos {
  id?: number;
  index?: number;
  title?: string;
  videos?: IVideoCategory[];
  isLoading?: boolean;
  itemClassName?: string;
}

export interface IVideoCategory {
  id?: string;
  duration?: number;
  ageRating?: TAgeRating;
  title?: string;
  views?: ISharedViews;
  thumbnail?: IUrl;
  playlists?: ISharedPlaylists;
  publishedAt?: string;
  channel?: IVideoCategoryChannel;
}

export interface IVideoCategoryChannel {
  id?: string;
  title?: string;
  logoUrl?: string;
}

export interface ISharedPlaylists {
  saved?: boolean;
  watchLater?: boolean;
}
export interface ISharedViews {
  count?: string;
  breakpoint?: number;
}
export interface IUrl {
  url?: string;
}
