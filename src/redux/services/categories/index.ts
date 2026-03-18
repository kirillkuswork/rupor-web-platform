import { ICategoriesResponse } from './responseModel';
import { baseApi } from '../baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoriesResponse, { preloadVideos: number }>({
      query: ({ preloadVideos }) => ({
        url: `/video/v2/category/video?preloadVideos=${preloadVideos}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useLazyGetCategoriesQuery } = categoryApi;
