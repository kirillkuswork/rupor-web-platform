import { buildPathWithQueryParams } from '@/shareds/lib/helpers/buildPathWithQueryParams';
import {
  IGetVideoByIdRequest,
  IGetVideoListRequest,
  IGetVideoListSearchRequest,
  IGetVideoSuggestionsRequest,
  IToggleVideoReactionRequest,
} from './requestModel';
import {
  IGetVideoByIdResponse,
  IGetVideoListResponse,
  IGetVideoSuggestionsResponse,
  IToggleVideoReactionResponse,
} from './responseModel';
import { baseApi } from '../baseApi';

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideoSuggestions: builder.query<IGetVideoSuggestionsResponse, IGetVideoSuggestionsRequest>({
      query: ({ query, limit = 10 }: IGetVideoSuggestionsRequest) => ({
        url: `/video/v2/video/search/suggestion?query=${query}&limit=${limit}&type=SUGGESTION_ALL`,
        method: 'GET',
      }),
    }),
    getVideoList: builder.query<IGetVideoListResponse, IGetVideoListRequest>({
      query: ({
        limit = 20, cursor, sortPublishedAt, categoryId,
      }: IGetVideoListRequest) => {
        const queryUrl = buildPathWithQueryParams('/video/v2/video', {
          limit,
          cursor,
          sortPublishedAt,
          categoryId,
        }, ['cursor']);

        return {
          url: queryUrl,
          method: 'GET',
        };
      },
      providesTags: () => [{ type: 'Videos', id: 'LIST' }],
    }),
    getVideoListAfterLogout: builder.query<IGetVideoListResponse, void>({
      query: () => {
        const queryUrl = buildPathWithQueryParams('/video/v2/video', {
          limit: 20,
        });

        return {
          url: queryUrl,
          method: 'GET',
        };
      },
    }),
    getVideoListSearch: builder.query<IGetVideoListResponse, IGetVideoListSearchRequest>({
      query: ({
        query = '',
        limit = 20,
        cursor = null,
      }: IGetVideoListSearchRequest) => {
        const queryUrl = buildPathWithQueryParams('/video/v2/search', {
          query,
          limit,
          cursor,
        }, ['cursor']);

        return {
          url: queryUrl,
          method: 'GET',
        };
      },
    }),
    getVideoById: builder.query<IGetVideoByIdResponse, IGetVideoByIdRequest>({
      query: ({ videoId }: IGetVideoByIdRequest) => ({
        url: `/video/v2/video/${videoId}`,
        method: 'GET',
      }),
    }),
    toggleVideoReaction: builder.query<IToggleVideoReactionResponse, IToggleVideoReactionRequest>({
      query: ({ emotionId, videoId }: IToggleVideoReactionRequest) => ({
        url: '/video/v2/reaction',
        method: 'POST',
        body: {
          emotionId,
          videoId,
        },
      }),
    }),
  }),
});

export const {
  useGetVideoSuggestionsQuery,
  // Lazy
  useLazyGetVideoListQuery,
  useLazyGetVideoListAfterLogoutQuery,
  useLazyGetVideoListSearchQuery,
  useLazyGetVideoByIdQuery,
  useLazyToggleVideoReactionQuery,
} = videoApi;
