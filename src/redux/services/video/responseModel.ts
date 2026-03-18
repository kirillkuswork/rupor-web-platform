import { TReactionResponseCodes } from '@/redux/services/common/reactions/reactionResponse';
import { IPagination, IVideo } from './baseModel';

interface IVideoSuggestion {
  entityId: string;
  text: string;
}

export interface IGetVideoSuggestionsResponse {
  suggestions?: IVideoSuggestion[];
}

export interface IGetVideoListResponse {
  videos?: IVideo[];
  pagination?: IPagination;
  total?: number
}

// GetVideoById

export interface IGetVideoByIdResponse {
  // Посмотреть в типах че за блок и какая схема данных
  block: null
  video: IVideo
}

export interface IToggleVideoReactionResponse {
  code: TReactionResponseCodes
}
