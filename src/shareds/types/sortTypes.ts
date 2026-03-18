import { Order } from '@/shareds/types/sortOrder';

export type SortOrder = Order.SortOrderUndefined | Order.SortOrderAsc | Order.SortOrderDesc;
export type SortType = 'SORT_DIRECTION_UNDEFINED' | 'SORT_DIRECTION_CREATED_AT_DESC' | 'SORT_DIRECTION_CREATED_AT_ASC';

export const ApivideoCommentsSortDirection = {
  Undefined: 'SORT_DIRECTION_UNDEFINED',
  CreatedAtDesc: 'SORT_DIRECTION_CREATED_AT_DESC',
  CreatedAtAsc: 'SORT_DIRECTION_CREATED_AT_ASC',
};

// Использовать новое название VideoCommentsSortDirection вместо ApivideoCommentsSortDirection
export const VideoCommentsSortDirection = ApivideoCommentsSortDirection;

export type TVideoCommentsSortDirection = typeof VideoCommentsSortDirection[keyof typeof VideoCommentsSortDirection];

export type SortingObjectType = {
  label: string,
  value: TVideoCommentsSortDirection;
  // sort: RequestSorting<CommentType>,
};
