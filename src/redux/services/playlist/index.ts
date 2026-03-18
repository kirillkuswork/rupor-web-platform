import { baseApi } from '@/redux/services/baseApi';
import { playlistActions } from '@/redux/actions/playlistActions';
import { buildPathWithQueryParams } from '@/shareds/lib/helpers/buildPathWithQueryParams';
import { IGetVideoListResponse } from '@/redux/services/video/responseModel';
import {
  IAddVideoToPersonalPlaylistRequest,
  IAddVideoToWatchLaterPlaylistRequest,
  ICreateNewPlaylistRequest,
  IDeleteMyPlaylistByIdRequest,
  IDeleteVideoFromHistoryRequest,
  IDeleteVideoFromPersonalPlaylistRequest,
  IDeleteVideoFromWatchLaterPlaylistRequest,
  IEditMyPlaylistByIdRequest,
  IGetHistoryVideosRequest,
  IGetMyPlaylistByIdRequest,
  IGetMyPlaylistsRequest,
  IGetWatchLaterVideosRequest,
  IMoveVideoToAnotherPlaylistRequest,
} from './requestModel';
import {
  ICreateNewPlaylistResponse,
  IGetHistoryVideosResponse,
  IGetMyPlaylistByIdResponse,
  IGetMyPlaylistsResponse,
} from './responseModel';

export const playlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHistoryVideos: builder.query<IGetHistoryVideosResponse, IGetHistoryVideosRequest>({
      query: ({
        cursor,
        limit = 20,
      }) => {
        const url = buildPathWithQueryParams('/video/v2/playlist/history/videos', {
          limit,
          cursor,
        }, ['cursor']);

        return {
          url,
          method: 'GET',
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(playlistActions.setIsHistoryDeleted(false));
      },
    }),
    deleteHistoryVideos: builder.mutation<void, void>({
      query: () => ({
        url: 'video/v2/playlist/history',
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(playlistActions.setIsHistoryDeleted(true));
      },
    }),
    deleteVideoFromHistory: builder.mutation<void, IDeleteVideoFromHistoryRequest>({
      query: ({ videoId }) => ({
        url: `/video/v2/playlist/history/video/${videoId}`,
        method: 'DELETE',
      }),
    }),
    getMyPlaylists: builder.query<IGetMyPlaylistsResponse, IGetMyPlaylistsRequest>({
      query: ({
        cursor,
        limit = 20,
        sortPlaylistsCreatedAt,
        sortVideos,
        preloadVideos = 20,
      }) => {
        const url = buildPathWithQueryParams('/video/v2/playlist/personal/me', {
          limit,
          cursor,
          sortPlaylistsCreatedAt,
          sortVideos,
          preloadVideos,
        }, ['cursor']);

        return {
          url,
          method: 'GET',
        };
      },
    }),
    getMyPlaylistById: builder.query<IGetMyPlaylistByIdResponse, IGetMyPlaylistByIdRequest>({
      query: ({
        playlistId,
        sortCreatedAt,
        limit,
        cursor,
      }) => {
        const url = buildPathWithQueryParams(`/video/v2/playlist/personal/${playlistId}/get`, {
          limit,
          cursor,
          sortCreatedAt,
        }, ['cursor']);

        return {
          url,
          method: 'GET',
        };
      },
    }),
    createNewPlaylist: builder.mutation<ICreateNewPlaylistResponse, ICreateNewPlaylistRequest>({
      query: ({ title, description }) => ({
        url: 'video/v2/playlist/personal',
        method: 'POST',
        body: {
          title,
          description,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(playlistActions.setCreatedPlaylistId(data.playlistId));
      },
    }),
    deleteMyPlaylistById: builder.mutation<void, IDeleteMyPlaylistByIdRequest>({
      query: ({ playlistId }) => ({
        url: `video/v2/playlist/personal/${playlistId}`,
        method: 'DELETE',
      }),
    }),
    editMyPlaylistById: builder.mutation<void, IEditMyPlaylistByIdRequest>({
      query: ({ title, description, playlistId }) => ({
        url: 'video/v2/playlist/personal',
        method: 'PATCH',
        body: {
          title,
          description,
          playlistId,
        },
      }),
    }),
    addVideoToWatchLaterPlaylist: builder.query<void, IAddVideoToWatchLaterPlaylistRequest>({
      query: ({ videoId }) => ({
        url: '/video/v2/playlist/watchlater/video',
        method: 'POST',
        body: {
          videoId,
        },
      }),
    }),
    deleteVideoFromWatchLaterPlaylist: builder.query<void, IDeleteVideoFromWatchLaterPlaylistRequest>({
      query: ({ videoId }) => ({
        url: `/video/v2/playlist/watchlater/video/${videoId}`,
        method: 'DELETE',
      }),
    }),
    moveVideoToAnotherPlaylist: builder.mutation<void, IMoveVideoToAnotherPlaylistRequest>({
      query: (params) => ({
        url: 'video/v2/playlist/personal/move',
        method: 'POST',
        body: params,
      }),
    }),
    addVideoToPersonalPlaylist: builder.query<void, IAddVideoToPersonalPlaylistRequest>({
      query: ({ videoIds, playlistId }) => ({
        url: `/video/v2/playlist/personal/${playlistId}/videos`,
        method: 'POST',
        body: {
          videoIds,
        },
      }),
    }),
    deleteVideoFromPersonalPlaylist: builder.query<void, IDeleteVideoFromPersonalPlaylistRequest>({
      query: ({ videoId }) => ({
        url: `/video/v2/playlist/personal/videos/${videoId}`,
        method: 'DELETE',
      }),
    }),
    getWatchLaterVideos: builder.query<IGetVideoListResponse, IGetWatchLaterVideosRequest>({
      query: ({
        sortCreatedAt,
        limit = 20,
        cursor,
      }) => {
        const queryString = buildPathWithQueryParams('/video/v2/playlist/watchlater/videos', {
          sortCreatedAt,
          limit,
          cursor,
        }, ['sortCreatedAt', 'limit', 'cursor']);

        return {
          url: queryString,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetMyPlaylistByIdQuery,
  useGetMyPlaylistsQuery,
  // Mutation
  useDeleteHistoryVideosMutation,
  useCreateNewPlaylistMutation,
  useDeleteMyPlaylistByIdMutation,
  useEditMyPlaylistByIdMutation,
  useMoveVideoToAnotherPlaylistMutation,
  useDeleteVideoFromHistoryMutation,
  // Lazy
  useLazyGetHistoryVideosQuery,
  useLazyGetMyPlaylistsQuery,
  useLazyGetMyPlaylistByIdQuery,
  useLazyGetWatchLaterVideosQuery,
  useLazyAddVideoToPersonalPlaylistQuery,
  useLazyDeleteVideoFromPersonalPlaylistQuery,
  useLazyAddVideoToWatchLaterPlaylistQuery,
  useLazyDeleteVideoFromWatchLaterPlaylistQuery,
} = playlistApi;
