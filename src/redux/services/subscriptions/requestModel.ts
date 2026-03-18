import { SortOrder } from '@/shareds/types/sortTypes';

export interface IGetVideoSubscriptions {
  sortPublishedAt?: SortOrder
  limit?: number;
  cursor?: string | null;
}
