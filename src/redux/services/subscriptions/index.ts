import { IGetVideoListResponse } from '@/redux/services/video/responseModel';
import { baseApi } from '@/redux/services/baseApi';
import { buildPathWithQueryParams } from '@/shareds/lib/helpers/buildPathWithQueryParams';
import { IGetVideoSubscriptions } from './requestModel';

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideosSubscriptions: builder.query<
    IGetVideoListResponse,
    IGetVideoSubscriptions
    >({
      query: ({ limit, sortPublishedAt, cursor }) => {
        const queryUrl = buildPathWithQueryParams('/video/v2/video/subscriptions', {
          limit,
          sortPublishedAt,
          cursor,
        }, ['limit', 'sortPublishedAt', 'cursor']);

        return {
          url: queryUrl,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useLazyGetVideosSubscriptionsQuery } = subscriptionsApi;
