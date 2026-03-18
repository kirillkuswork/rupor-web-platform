import { ITokenResponse } from '@/redux/services/auth/baseTypes';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateVisitorId } from '@/shareds/helpers/getUnicUID';
import { APPLICATION_ID, APPLICATION_ID_REQUEST_HEADER_NAME } from '@/shareds/constants/auth';
import { Notification } from 'rupor-ui-kit';
import { i18n } from 'next-i18next';
import {
  IConfirmRequest,
  IDeclareRequest,
  IExistsRequest,
  INewDeviceRequest,
  INewLoginDeclareRequest,
  INewRegDeclareRequest,
  INewResetConfirmRequest,
  INewResetDeclareRequest,
} from './requestModel';
import {
  IDeclareResponse,
  IExistsResponse,
  INewDeviceResponse,
  INewLoginDeclareResponse,
  INewRefreshResponse,
  INewRegDeclareResponse,
  INewResetConfirmResponse,
  INewResetDeclareResponse,
  IRefreshResponse,
} from './responseModel';

const confirmUrls: Record<string, string> = {
  registrationConfirmationInfo: '/auth/v3/registration/confirm',
  resetConfirmationInfo: '/auth/v3/auth/user/reset/confirm',
};

export interface ApiError {
  errors?: Array<{
    code: string;
    httpStatusCode?: number
    message?: string;
  }>;
}

let isRefreshing = false;
let requestsQueue: (() => Promise<void>)[] = [];
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    headers.set(APPLICATION_ID_REQUEST_HEADER_NAME, APPLICATION_ID);
    return headers;
  },
  credentials: 'include',
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const isError = result?.error?.status === 500;
    const isUnauthorized = result?.error?.status === 401;
    const errorData = result?.error?.data as ApiError | undefined;
    const isTokenInvalid = errorData?.errors?.some((error) => error.code === 'refresh.invalid');

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
          const visitorId = await generateVisitorId();

          const deviceResult = await api
            .dispatch(authApi.endpoints.newDevice.initiate({ uid: visitorId })).unwrap();

          if (deviceResult && !isTokenInvalid) {
            await Promise.all(requestsQueue.map((req) => req()));
            requestsQueue = [];
            result = await baseQuery(args, api, extraOptions);
          } else {
            requestsQueue = [];
            console.error(errorData?.errors);
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
  endpoints: (builder) => ({
    setDevice: builder.query<unknown, unknown>({
      query: (body) => ({
        url: '/auth/v2/auth/device',
        method: 'POST',
        body,
      }),
    }),
    getPublicKey: builder.query<unknown, unknown>({
      query: (body) => ({
        url: '/auth/v2/auth/public-key',
        method: 'GET',
        body,
      }),
    }),
    refresh: builder.mutation<IRefreshResponse, void>({
      query: (body) => ({
        url: '/auth/v2/auth/refresh',
        method: 'POST',
        body,
      }),
    }),
    rupass: builder.query<unknown, unknown>({
      query: (body) => ({
        url: '/auth/v2/auth/rupass',
        method: 'POST',
        body,
      }),
    }),
    declare: builder.query<IDeclareResponse, IDeclareRequest>({
      query: (body) => ({
        url: '/auth/v2/auth/user/declare',
        method: 'POST',
        body,
      }),
    }),
    declareRegistration: builder.query<IDeclareResponse, IDeclareRequest>({
      query: (body) => ({
        url: '/auth/v2/registration/declare',
        method: 'POST',
        body,
      }),
    }),
    validate: builder.query<unknown, unknown>({
      query: (body) => ({
        url: '/auth/v2/auth/validate',
        method: 'POST',
        body,
      }),
    }),
    exists: builder.query<IExistsResponse, IExistsRequest>({
      query: (body) => ({
        url: '/auth/v2/credential/exists',
        method: 'POST',
        body,
      }),
    }),
    credentialsDeclare: builder.query<IDeclareResponse, IDeclareRequest>({
      query: (body) => ({
        url: '/auth/v2/credential/user/declare',
        method: 'POST',
        body,
      }),
    }),
    credentialsConfirm: builder.query<unknown, IConfirmRequest>({
      query: (body) => ({
        url: '/auth/v2/credential/user/confirm',
        method: 'POST',
        body,
      }),
    }),

    // NEW
    // login
    login: builder.query<INewLoginDeclareResponse, INewLoginDeclareRequest>({
      query: (body) => ({
        url: '/auth/v3/user/login',
        method: 'POST',
        body,
      }),
    }),
    // loginConfirm: builder.query<INewLoginConfirmResponse, INewLoginConfirmRequest>({
    //   query: (body) => ({
    //     url: '/auth/v3/auth/user/confirm',
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    // registration
    regDeclare: builder.query<INewRegDeclareResponse, INewRegDeclareRequest>({
      query: (body) => ({
        url: '/auth/v3/registration/declare',
        method: 'POST',
        body,
      }),
    }),
    // regConfirm: builder.query<INewRegConfirmResponse, INewRegConfirmRequest>({
    //   query: (body) => ({
    //     url: '/auth/v3/registration/confirm',
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    confirm: builder.query<ITokenResponse, IConfirmRequest>({
      query: ({ authType, confirmCodeId, confirmCodeValue }) => ({
        url: confirmUrls[authType!],
        method: 'POST',
        body: { confirmCodeId, confirmCodeValue },
      }),
    }),

    // reset
    resetDeclare: builder.query<
    INewResetDeclareResponse,
    INewResetDeclareRequest
    >({
      query: (body) => ({
        url: '/auth/v3/auth/user/reset/declare',
        method: 'POST',
        body: {
          service: body.service,
          language: body.language,
          value: body.input,
        },
      }),
    }),
    resetConfirm: builder.query<
    INewResetConfirmResponse,
    INewResetConfirmRequest
    >({
      query: (body) => ({
        url: '/auth/v3/auth/user/reset',
        method: 'POST',
        body,
      }),
    }),

    // refresh
    newRefresh: builder.query<INewRefreshResponse, void>({
      query: () => ({
        url: '/auth/v3/auth/refresh',
        method: 'POST',
      }),
    }),

    // device
    newDevice: builder.query<INewDeviceResponse, INewDeviceRequest>({
      query: (body) => ({
        url: '/auth/v3/auth/device',
        method: 'POST',
        body,
      }),
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  // Lazy
  useLazySetDeviceQuery,
  useLazyDeclareQuery,
  useLazyDeclareRegistrationQuery,
  useLazyExistsQuery,
  useLazyCredentialsDeclareQuery,
  useRefreshMutation,
  useLazyCredentialsConfirmQuery,

  // NEW
  // Auth
  useLazyRegDeclareQuery,
  useLazyLoginQuery,
  useLazyConfirmQuery,
  useLazyResetDeclareQuery,
  useLazyNewRefreshQuery,
  useLazyNewDeviceQuery,
  useLazyResetConfirmQuery,
} = authApi;
