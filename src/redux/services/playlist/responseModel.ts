import { IPlaylist, IVideo } from '../video/baseModel';
import { HistoryItem } from './baseModel';

export interface IGetHistoryVideosResponse {
  videos: HistoryItem[];
  pagination: {
    limit?: number;
    cursor?: string;
  }
  totalCount?: string;
}

export interface IGetMyPlaylistsResponse {
  playlists: IPlaylist[];
  pagination: {
    limit?: number;
    cursor?: string;
  }
}

export interface IGetMyPlaylistByIdResponse {
  playlist: IPlaylist;
  pagination: {
    total?: number;
    cursor?: string;
  }
  videos: IVideo[];
}

export interface ICreateNewPlaylistResponse {
  playlistId: string;
  createdAt: string;
}
