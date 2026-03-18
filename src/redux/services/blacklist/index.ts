import { IValidateTextResponseModel } from '@/redux/services/blacklist/responseModel';
import { baseApi } from '@/redux/services/baseApi';
import { IValidateTextRequestModel } from './requestModel';

export const blacklistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    validateText: builder.query<IValidateTextResponseModel, IValidateTextRequestModel>({
      query: (body: IValidateTextRequestModel) => ({
        url: 'blacklist/v1/assert/text',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  // Lazy
  useLazyValidateTextQuery,
} = blacklistApi;
