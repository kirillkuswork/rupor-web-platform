import { IUploadFileToStorageRequest } from './requestModel';
import { IGetStoragesResponse, IUploadFileToStorageResponse } from './responseModel';
import { baseApi } from '../baseApi';

export const filesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFileToStorage: builder.query<
    IUploadFileToStorageResponse,
    IUploadFileToStorageRequest
    >({
      query: ({ storage_id, file }: IUploadFileToStorageRequest) => ({
        url: `files/v1/upload/${storage_id}`,
        method: 'POST',
        body: file,
      }),
    }),
    getStorages: builder.query<
    IGetStoragesResponse,
    void
    >({
      query: () => ({
        url: 'files/v1/storage',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLazyUploadFileToStorageQuery,
  useLazyGetStoragesQuery,
} = filesApi;
