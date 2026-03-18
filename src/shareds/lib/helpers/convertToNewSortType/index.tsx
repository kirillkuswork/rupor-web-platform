import { SortOrder, SortType } from '@/shareds/types/sortTypes';
import { Order } from '@/shareds/types/sortOrder';

export const convertToNewSortType = (sortType: SortType): SortOrder => {
  if (['ASC', 'SORT_DIRECTION_CREATED_AT_ASC'].includes(sortType)) {
    return Order.SortOrderAsc;
  }
  if (['DESC', 'SORT_DIRECTION_CREATED_AT_DESC'].includes(sortType)) {
    return Order.SortOrderDesc;
  }

  return Order.SortOrderUndefined;
};
