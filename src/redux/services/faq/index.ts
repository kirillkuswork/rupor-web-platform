import { IFAQAnswerId, IFAQCategoryId } from '@/redux/services/faq/requestModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFAQAnswer, IFAQCategories, IFAQCategory } from './responseModel';

export const faqApi = createApi({
  reducerPath: 'faqApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getFAQCategories: builder.query<IFAQCategories, string>({
      query: (code) => ({
        url: `/dictionary/v2/faq/categories/locale_code/${code}`,
        method: 'GET',
      }),
    }),
    getFAQCategoryById: builder.query<IFAQCategory, IFAQCategoryId>({
      query: (params) => ({
        url: `/dictionary/v2/faq/categories/${params.categoryId}/locale_code/${params.code}`,
        method: 'GET',
      }),
    }),
    getFAQAnswer: builder.query<IFAQAnswer, IFAQAnswerId>({
      query: (params) => ({
        url: `/dictionary/v2/faq/answer/${params.id}/locale_code/${params.code}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLazyGetFAQCategoriesQuery,
  useLazyGetFAQCategoryByIdQuery,
  useLazyGetFAQAnswerQuery,
} = faqApi;
