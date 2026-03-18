import {
  IChangeConfirmRequest,
  IChangeCredentialsDeclareRequest,
  IChangeDeclareRequest,
  IUpdateUserRequest,
} from '@/redux/services/users/requestModel';
import { IDeclareResponse } from '@/redux/services/auth/responseModel';
import { ITokenResponse } from '@/redux/services/auth/baseTypes';
import { baseApi } from '../baseApi';
import {
  ICurrentCredentialsResponse, ILogoutResponse, IMeResponse, IMeResponseBackend,
} from './responseModel';

const settingsConfirmUrls: Record<string, string> = {
  passwordType: '/auth/v3/auth/user/change/confirm',
  emailType: '/auth/v3/credential/user/confirm',
};

export const usersService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeInfo: builder.query<IMeResponse, void>({
      query: () => ({
        url: '/users-devices/v1/users/me',
        method: 'GET',
      }),
      transformResponse: (rawResult: IMeResponseBackend): IMeResponse => ({
        ...rawResult,
        avatar: rawResult.avatar
          ? {
            createdAt: rawResult.avatar.CreatedAt,
            id: rawResult.avatar.ID,
            url: rawResult.avatar.URL,
            mimeType: rawResult.avatar.MimeType,
            size: rawResult.avatar.Size,
            updatedAt: rawResult.avatar.UpdatedAt,
            uploadPath: rawResult.avatar.UploadPath,
          }
          : undefined,
      }),
    }),

    updateUser: builder.mutation<IMeResponse, IUpdateUserRequest>({
      query: (body) => ({
        url: '/users-devices/v1/users',
        method: 'PATCH',
        body,
      }),
    }),
    currentCredentials: builder.query<ICurrentCredentialsResponse, void>({
      query: () => ({
        url: '/auth/v3/credential/me',
        method: 'GET',
      }),
    }),
    logout: builder.mutation<ILogoutResponse, void>({
      query: (body) => ({
        url: '/auth/v3/user/logout',
        method: 'POST',
        body,
      }),
    }),

    // SETTINGS
    userCredentialsDeclare: builder.query<IDeclareResponse, IChangeCredentialsDeclareRequest>({
      query: (body) => ({
        url: '/auth/v3/credential/user/declare',
        method: 'POST',
        body,
      }),
    }),
    userChangeDeclare: builder.query<IDeclareResponse, IChangeDeclareRequest>({
      query: (body) => ({
        url: '/auth/v3/auth/user/change/declare',
        method: 'POST',
        body,
      }),
    }),
    userChangeConfirm: builder.query<ITokenResponse, IChangeConfirmRequest>({
      query: ({ settingsType, confirmCodeId, confirmCodeValue }) => ({
        url: settingsConfirmUrls[settingsType!],
        method: 'POST',
        body: { confirmCodeId, confirmCodeValue },
      }),
    }),
  }),
});

export const {
  useLazyGetMeInfoQuery,
  useGetMeInfoQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useLazyCurrentCredentialsQuery,
  useCurrentCredentialsQuery,

  // Settings
  useLazyUserChangeDeclareQuery,
  useLazyUserChangeConfirmQuery,
  useLazyUserCredentialsDeclareQuery,
} = usersService;
