import { ISendMetricsRequest, TMetricsEvents } from '@/redux/services/metrics/requestModel';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPLICATION_ID, APPLICATION_ID_REQUEST_HEADER_NAME } from '@/shareds/constants/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_METRICS_API_URL,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    headers.set(APPLICATION_ID_REQUEST_HEADER_NAME, APPLICATION_ID);
    return headers;
  },
  credentials: 'include',
});

export const metricsApi = createApi({
  baseQuery,
  reducerPath: 'metricsApi',
  endpoints: (builder) => ({
    sendEvents: builder.mutation<void, ISendMetricsRequest<TMetricsEvents>>({
      query: (payload) => ({
        url: '/collector/v2/events',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useSendEventsMutation,
} = metricsApi;
