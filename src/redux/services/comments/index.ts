import { buildPathWithQueryParams } from '@/shareds/lib/helpers/buildPathWithQueryParams';
import { baseApi } from '@/redux/services/baseApi';
import { Order, SortField } from '@/shareds/types/sortOrder';
import {
  IComment,
  IGetCommentRepliesResponse,
  IGetCommentsByVideoIdResponse,
} from './responseModel';
import {
  IGetCommentRepliesRequest,
  IGetCommentsByVideoIdRequest,
} from './requestModel';

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByVideoId: builder.query<
    IGetCommentsByVideoIdResponse,
    IGetCommentsByVideoIdRequest
    >({
      query: ({
        videoId,
        cursor,
        sortField = SortField.SortFieldCreatedAt,
        sortOrder = Order.SortOrderDesc,
        limit = 10,
      }: IGetCommentsByVideoIdRequest) => {
        const basePath = `user-comments/v3/comments/video/${videoId}`;
        const path = buildPathWithQueryParams(basePath, {
          sortField,
          sortOrder,
          limit,
          cursor,
        });
        return {
          url: path,
          method: 'GET',
        };
      },
    }),
    getCommentReplies: builder.query<
    IGetCommentRepliesResponse,
    IGetCommentRepliesRequest
    >({
      query: ({
        commentId,
        cursor,
        sortField = SortField.SortFieldCreatedAt,
        sortOrder = Order.SortOrderDesc,
        limit = 10,
      }: IGetCommentRepliesRequest) => {
        const basePath = `user-comments/v3/comments/root_comment/${commentId}`;
        const path = buildPathWithQueryParams(basePath, {
          sortField,
          sortOrder,
          limit,
          cursor,
        });
        return {
          url: path,
          method: 'GET',
        };
      },
    }),
    postComment: builder.mutation<void, { videoId: string; text: string }>({
      query: ({ videoId, text }) => ({
        url: `user-comments/v2/comments/video/${videoId}`,
        method: 'POST',
        body: { text },
      }),
    }),
    postCommentReply: builder.mutation<
    void,
    { commentId: string; text: string }
    >({
      query: ({ commentId, text }) => ({
        url: `user-comments/v2/comments/comment/${commentId}`,
        method: 'POST',
        body: { text },
      }),
    }),
    postCommentReaction: builder.mutation<
    void,
    { commentId: string; emotionId: string }
    >({
      query: ({ commentId, emotionId }) => ({
        url: 'user-comments/v2/comments/reaction',
        method: 'POST',
        body: { commentId, emotionId },
      }),
    }),
    patchComment: builder.mutation<
    { data: IComment },
    { commentId: string; text: string }
    >({
      query: ({ commentId, text }) => ({
        url: `user-comments/v2/comments/${commentId}`,
        method: 'PATCH',
        body: { text },
      }),
    }),
    deleteComment: builder.mutation<void, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `user-comments/v2/comments/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  // Lazy
  useLazyGetCommentsByVideoIdQuery,
  useLazyGetCommentRepliesQuery,
  // Post
  usePostCommentMutation,
  usePostCommentReplyMutation,
  usePostCommentReactionMutation,
  usePatchCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
