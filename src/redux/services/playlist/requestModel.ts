import { SortOrder } from '@/shareds/types/sortTypes';

export interface IGetHistoryVideosRequest {
  limit?: number;
  cursor?: string;
}

export interface IGetMyPlaylistsRequest {
  cursor?: string;
  sortPlaylistsCreatedAt?: SortOrder;
  sortVideos?: SortOrder;
  limit?: number;
  preloadVideos?: number;
}

export interface IGetMyPlaylistByIdRequest {
  playlistId: string;
  sortCreatedAt?: SortOrder;
  limit?: number;
  cursor?: string;
}

export interface IAddVideoToWatchLaterPlaylistRequest {
  videoId: string
}

export interface IDeleteVideoFromWatchLaterPlaylistRequest {
  videoId: string
}

export interface ICreateNewPlaylistRequest {
  title: string;
  description?: string;
}

export interface IDeleteMyPlaylistByIdRequest {
  playlistId: string;
}

export interface IEditMyPlaylistByIdRequest {
  title: string;
  description?: string;
  playlistId: string;
}

export interface IAddVideoToPersonalPlaylistRequest {
  playlistId: string
  videoIds: string[]
}

export interface IMoveVideoToAnotherPlaylistRequest {
  fromPlaylistId: string
  toPlaylistId: string
  videoId: string
}

export interface IDeleteVideoFromPersonalPlaylistRequest {
  videoId: string
}

export interface IGetWatchLaterVideosRequest {
  sortCreatedAt?: SortOrder;
  limit?: number;
  cursor?: string;
}

export interface IDeleteVideoFromHistoryRequest {
  videoId: string;
}
