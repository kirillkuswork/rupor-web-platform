import { SortOrder } from '@/shareds/types/sortTypes';

export interface IGetChannelsRequest {
  sortCreatedAt?: SortOrder;
  limit?: number;
  cursor?: string;
  preloadVideos?: number;
  category?: number;
}

export interface IGetChannelVideosByIdRequest {
  channelId: string;
  sortPublishedAt?: SortOrder;
  limit?: number;
  cursor?: string;
}

export interface ISubscribeToChannelRequest {
  channelId: string;
  videoId?: string;
}
