import { APPLICATION_ID, APPLICATION_ID_REQUEST_HEADER_NAME } from '@/shareds/constants/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authApi } from '@/redux/services/auth';
import { i18n } from 'next-i18next';
import { Notification } from 'rupor-ui-kit';

let isRefreshing = false;
let requestsQueue: (() => Promise<void>)[] = [];

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    headers.set(APPLICATION_ID_REQUEST_HEADER_NAME, APPLICATION_ID);
    return headers;
  },
  credentials: 'include',
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const isError = result?.error?.status === 500;
    const isUnauthorized = result?.error?.status === 401;

    if (isError) {
      Notification.add?.({
        content: i18n?.t('Common_error_500'),
        duration: 5000,
        containerClassName: '!bg-red !text-white',
      });
    }

    if (isUnauthorized) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshResult = await api.dispatch(
            authApi.endpoints.newRefresh.initiate(),
          ).unwrap();

          if (refreshResult?.tokenType === 1) {
            await Promise.all(requestsQueue.map((req) => req()));
            requestsQueue = [];

            result = await baseQuery(args, api, extraOptions);
          } else {
            requestsQueue = [];
          }
        } catch (error) {
          console.error(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        requestsQueue.push(async () => {
          await baseQuery(args, api, extraOptions);
        });
      }
    }

    return result;
  },
  endpoints: () => ({}),
  tagTypes: ['base', 'Orders', 'HistoryVideos', 'Videos', 'Playlist'],
  refetchOnMountOrArgChange: true,
});
