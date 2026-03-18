import { BLACK_LIST_ERROR, INITIAL_BLACK_LIST_ERROR } from '@/shareds/constants/blackList';

const BlackListErrorTypes = [
  BLACK_LIST_ERROR, INITIAL_BLACK_LIST_ERROR,
] as (string | undefined)[];

export const isBlackListError = (type: string | undefined) => BlackListErrorTypes.includes(type);
