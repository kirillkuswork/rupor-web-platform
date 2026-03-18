import { buildPathWithQueryParams } from '@/shareds/lib/helpers/buildPathWithQueryParams';
import { playlistActions } from '@/redux/actions/playlistActions';
import { IGetChannelsRequest, IGetChannelVideosByIdRequest, ISubscribeToChannelRequest } from './requestModel';
import { IChannelsResponse, IGetChannelVideosByIdResponse, ISubscribeToChannelResponse } from './responseModel';
import { baseApi } from '../baseApi';
import { IChannelResponse } from '../video/baseModel';

export const channelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query<IChannelsResponse, IGetChannelsRequest>({
      query: ({
        limit, preloadVideos, sortCreatedAt, category, cursor,
      }) => {
        const url = buildPathWithQueryParams('/video/v2/channel', {
          limit,
          cursor,
          preloadVideos,
          sortCreatedAt,
          category,
        }, ['cursor']);

        return {
          url,
          method: 'GET',
        };
      },
    }),
    getChannelById: builder.query<IChannelResponse, string>({
      query: (channelId: string) => {
        const url = `/video/v2/channel/${channelId}`;

        return {
          url,
          method: 'GET',
        };
      },
    }),
    getChannelVideosById: builder.query<IGetChannelVideosByIdResponse, IGetChannelVideosByIdRequest>({
      query: ({
        channelId, sortPublishedAt, limit, cursor,
      }) => {
        const url = buildPathWithQueryParams(`/video/v2/channel/${channelId}/video`, {
          limit,
          cursor,
          sortPublishedAt,
        }, ['cursor']);

        return {
          url,
          method: 'GET',
        };
      },
    }),
    subscribeToChannel: builder.query<ISubscribeToChannelResponse, ISubscribeToChannelRequest>({
      query: ({ channelId }: ISubscribeToChannelRequest) => ({
        url: 'video/v2/channel/subscribe',
        method: 'POST',
        body: { channelId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(playlistActions.setSubscribedChannel({
          channelId: arg.channelId,
          subscribers: data.subscribers,
          isSubscribed: true,
        }));
      },
    }),
    unsubscribeFromChannel: builder.query<ISubscribeToChannelResponse, ISubscribeToChannelRequest>({
      query: ({ channelId }: ISubscribeToChannelRequest) => ({
        url: 'video/v2/channel/unsubscribe',
        method: 'POST',
        body: { channelId },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(playlistActions.setSubscribedChannel({
          channelId: arg.channelId,
          subscribers: data.subscribers,
          isSubscribed: false,
        }));
      },
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetChannelByIdQuery,
  // Lazy
  useLazyGetChannelsQuery,
  useLazyGetChannelVideosByIdQuery,
  useLazySubscribeToChannelQuery,
  useLazyUnsubscribeFromChannelQuery,
} = channelsApi;
