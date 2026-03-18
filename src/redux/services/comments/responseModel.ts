import { IReactions } from '@/redux/services/common/reactions/reactionResponse';

export interface ICommentMetadata {
  'page'?: {
    'total'?: number;
    'cursor'?: string;
  };
  'pagination'?: {
    'limit'?: number;
    'start'?: number;
    'total'?: number;
  };
  'totalCommentsCount'?: number;
}

export interface ICommentAuthor {
  'id'?: string;
  'name'?: string;
  'avatar'?: {
    'id'?: string;
    'url'?: string;
    'metadata'?: {
      'colors'?: Array<string>;
      'format'?: string;
      'width'?: number;
      'height'?: number;
    };
  };
}

export interface IComment {
  'id': string;
  'author'?: ICommentAuthor;
  'text'?: string;
  'replyTo'?: string;
  'publishedAt'?: string;
  'createdAt'?: string;
  'updatedAt'?: string;
  'hasChildes'?: boolean;
  'hasSubComments'?: boolean;
  'subCommentsCount'?: number;
  'emotions'?: { [key: string]: number; };
  'reactions'?: IReactions;
}

export interface IGetCommentsByVideoIdResponse {
  'data'?: Array<IComment>;
  'totalComments'?: number;
  'meta'?: ICommentMetadata;
}

export interface IGetCommentRepliesResponse {
  'data'?: Array<IComment>;
  'meta'?: ICommentMetadata;
}
