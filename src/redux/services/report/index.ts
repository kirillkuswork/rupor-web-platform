import { IAddTechnicalComplainRequest, IAddVideoComplainRequest, IAddProblemReportRequest } from './requestModel';
import { IAddVideoComplainResponse, IGetTechnicalComplainsResponse, IGetVideoComplainsResponse } from './responseModel';
import { baseApi } from '../baseApi';

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideoComplains: builder.query<IGetVideoComplainsResponse, void>({
      query: () => ({
        url: '/moderation/v1/complaint/video/type/list',
        method: 'GET',
      }),
    }),
    addVideoComplain: builder.mutation<IAddVideoComplainResponse, IAddVideoComplainRequest>({
      query: (params: IAddVideoComplainRequest) => ({
        url: '/moderation/v1/complaint/video/ticket',
        method: 'POST',
        body: params,
      }),
    }),
    getTechnicalComplains: builder.query<IGetTechnicalComplainsResponse, void>({
      query: () => ({
        url: '/moderation/support/v1/problem/type/list',
        method: 'GET',
      }),
    }),
    addTechnicalComplain: builder.mutation<void, IAddTechnicalComplainRequest>({
      query: (params: IAddTechnicalComplainRequest) => ({
        url: '/moderation/support/v1/problem/report',
        method: 'POST',
        body: params,
      }),
    }),
    addProblemReport: builder.mutation<unknown, IAddProblemReportRequest>({
      query: (params: IAddProblemReportRequest) => ({
        url: '/moderation/support/v1/problem/faq/report',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const {
  useGetVideoComplainsQuery,
  useGetTechnicalComplainsQuery,
  useAddVideoComplainMutation,
  useAddTechnicalComplainMutation,
  useAddProblemReportMutation,
} = reportApi;
