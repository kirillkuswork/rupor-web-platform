import { INITIAL_BLACK_LIST_ERROR } from '@/shareds/constants/blackList';

export const isInitialBlackListError = (type: string | undefined) => (
  type === INITIAL_BLACK_LIST_ERROR
);
