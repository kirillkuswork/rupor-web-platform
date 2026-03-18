import { Order, SortField } from '@/shareds/types/sortOrder';

export type TCommentsSortField =
  | SortField.SortFieldUndefined
  | SortField.SortFieldCreatedAt;

export type TCommentsSortOrder =
  | Order.SortOrderUndefined
  | Order.SortOrderAsc
  | Order.SortOrderDesc;

export interface IGetCommentsByVideoIdRequest {
  videoId: string;
  sortField?: TCommentsSortField;
  sortOrder?: TCommentsSortOrder;
  limit?: number;
  cursor?: string;
}

export interface IGetCommentRepliesRequest {
  commentId: string;
  sortField?: TCommentsSortField;
  sortOrder?: TCommentsSortOrder;
  limit?: number;
  cursor?: string;
}
