import { SortOrder } from '@/shareds/types/sortTypes';
import { TEmotionIds } from '@/redux/services/common/reactions/reactionResponse';

export interface IGetVideoSuggestionsRequest {
  query: string;
  limit: number;
}

export interface IGetVideoListRequest {
  limit?: number;
  cursor?: string | null;
  sortPublishedAt?: SortOrder
  categoryId?: number
}

export interface IGetVideoListSearchRequest {
  query: string;
  limit: number;
  cursor?: string | null;
}

// GetVideoById

export interface IGetVideoByIdRequest {
  videoId: string
}

export interface IToggleVideoReactionRequest {
  emotionId: TEmotionIds
  videoId: string
}
