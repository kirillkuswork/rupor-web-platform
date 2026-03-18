import { baseApi } from '../baseApi';
import { IFiledCheck } from './requestModel';

type TListsWords = {
  [key in string]: {
    value: string[]
  }
};
export const blackListService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkInBlackList: builder.query<{ words: TListsWords }, { fields: IFiledCheck[] }>({
      query: (body) => ({
        url: '/blacklist/v1/assert/text',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLazyCheckInBlackListQuery } = blackListService;
