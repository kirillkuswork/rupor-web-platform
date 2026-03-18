import { TAgeRating } from '@/shareds/types/ageRating';
import { IReactions } from '../common/reactions/reactionResponse';
import { IVideoSharedVideoStatus } from '../playlist/baseModel';

export interface IVideoChannel {
  id?: string;
  icon?: {
    url?: string;
  };
  title?: string;
  logoUrl?: string;
  subscribersCount?: number
  owner?: {
    authorId?: string
  }
  subscribed?: boolean
}

export interface IVideoViews {
  count?: string;
  userView?: {
    breakpoint?: number;
  }
}

export interface IVideoPlaylists {
  saved?: boolean;
  watchLater?: boolean;
}

export type TUploadingSource = 'RUTUBE' | 'RUPOR';

export interface IVideo {
  block?: IVideoBlock;
  id: string;
  channel?: IVideoChannel;
  duration?: number;
  ageRating?: TAgeRating;
  title: string;
  video?: {
    url?: string;
  };
  thumbnail?: {
    url?: string;
  };
  publishedAt?: string;
  views?: IVideoViews;
  playlists?: IVideoPlaylists;
  createdAt?: string;
  status?: IVideoSharedVideoStatus;
  age?: TAgeRating;
  author?: {
    authorId: string
  },
  comments?: {
    count: number
    enabled: boolean
    // Не вижу смысла пока выносить в отдельный тип
    // посмотрим, используется ли где-нибудь еще
    sortDirection: 'SORT_DIRECTION_CREATED_AT_DESC' | 'SORT_DIRECTION_CREATED_AT_ASC'
  }
  deletedAt?: string;
  description?: string
  reactions?: IReactions
  trickmode?:{
    canvasHeight: number
    canvasWidth: number
    columns: number
    files: string[]
    frames: number
    mimeType: string
    rows: number
    step: number
  }
  viewedAt?: string;
  uploadingSource?: TUploadingSource
}

export interface IChannelCategory {
  id?: number;
  title?: string;
}

export interface IChannelResponse {
  channelId?: string;
  ownerId?: string;
  subscribersCount?: number;
  subscribed?: boolean;
  categories?: IChannelCategory[];
  title?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  iconUrl?: string;
  createdAt?: string;
}

type TPaylistType = 'PLAYLIST_TYPE_UNSPECIFIED' |
'PLAYLIST_TYPE_PERSONAL' |
'PLAYLIST_TYPE_SAVED' |
'PLAYLIST_TYPE_MANUAL' |
'PLAYLIST_TYPE_DELAYED' |
'saved';

export interface IPlaylist {
  type?: TPaylistType;
  title?: string;
  id: string;
  channelId?: string;
  description?: string;
  updatedAt?: string;
  ownerId?: string;
  videos?: IVideo[];
  totalVideos?: string
  index?: number;
}

export interface IPagination {
  cursor?: string;
  limit?: number;
  totalCount?: number;
}

type TBlockReason = 'BLOCK_REASON_UNDEFINED' |
'BLOCK_REASON_SEX' | 'BLOCK_REASON_DRUGS' | 'BLOCK_REASON_TERRORISM' |
'BLOCK_REASON_WEAPONS' | 'BLOCK_REASON_HATE_SPEECH' | 'BLOCK_REASON_SUICIDE' |
'BLOCK_REASON_POLITICS' | 'BLOCK_REASON_SPAM' | 'BLOCK_REASON_ANOTHER' |
'BLOCK_REASON_VIOLENCE' | 'BLOCK_REASON_LGBT_ADVOCACY';
interface IVideoBlock {
  reasons?: TBlockReason;
  blockedAt?: string;
}
