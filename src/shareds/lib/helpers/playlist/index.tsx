import { IPlaylist } from '@/redux/services/video/baseModel';
import type { TFunction } from 'i18next';
import { formatDateAgo } from '@/shareds/lib/utils/formatDateAgo';

export const SAVED_PLAYLIST_NAME = 'Saved_Playlist_Name';

export const getPlaylistName = (playlist?: IPlaylist) => {
  if (!playlist) {
    return '';
  }

  return playlist.title || '';
};

export const getPlaylistUpdateDate = (updatedAt: string, t: TFunction) => {
  if (!updatedAt) {
    return '';
  }

  return formatDateAgo(updatedAt, t!);
};

export const getPlaylistDropdownType = (playlist: IPlaylist) => {
  if (playlist?.type === 'PLAYLIST_TYPE_SAVED') {
    return 'savedPlaylist';
  }

  return 'personalPlaylist';
};
