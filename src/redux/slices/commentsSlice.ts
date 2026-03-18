import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '@/redux/services/comments/responseModel';
import { commentsApi, videoApi } from '@/redux/services';
import { IReactions, TEmotionIds } from '@/redux/services/common/reactions/reactionResponse';
import { addCommentsLikes } from '@/shareds/lib/utils/addCommentsLikes';
import { ICommentSortData, TFormattedSortOrder } from '@/widgets/VideoByIdComments';
import { Order, SortField } from '@/shareds/types/sortOrder';

interface ICommentQueueSliceState {
  comments: IComment[];
  commentReplies: Record<string, IComment[]>;
  total: number;
  sortDirection: ICommentSortData;
  deletedComment: {
    id: string | null;
    replyTo?: string | null;
  };
}

const initialState: ICommentQueueSliceState = {
  comments: [],
  commentReplies: {},
  total: 0,
  sortDirection: {
    sortField: SortField.SortFieldCreatedAt,
    sortOrder: Order.SortOrderDesc,
  },
  deletedComment: {
    id: null,
    replyTo: null,
  },
};

const videoPlayerSlice = createSlice({
  name: '@/features/addCommentToVideo',
  initialState,
  reducers: {
    setCommentReplies: (
      state,
      action: PayloadAction<{ commentId: string; commentReplies: IComment[] }>,
    ) => {
      state.commentReplies = {
        ...state.commentReplies,
        [action.payload.commentId]: action.payload.commentReplies,
      };
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    deleteComments: (state) => {
      state.comments = [];
    },
    deleteCommentReplies: (state) => {
      state.commentReplies = {};
    },
    setDeletingComment: (
      state,
      action: PayloadAction<{ id: string | null; replyTo?: string }>,
    ) => {
      state.deletedComment = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      commentsApi.endpoints.getCommentsByVideoId.matchFulfilled,
      (state, action) => {
        // Если изменился порядок сортировки - значит произошел запрос смены сортировки
        if (
          state.sortDirection.sortOrder
          !== action.meta.arg.originalArgs.sortOrder
        ) {
          state.total = action?.payload?.meta?.page?.total as number;
          // При первой загрузке почему-то не подхватывает sortOrder
          const chosenSortOrder = action?.meta?.arg?.originalArgs.sortOrder || Order.SortOrderDesc;

          state.comments = action.payload.data as IComment[];
          state.sortDirection.sortOrder = chosenSortOrder as TFormattedSortOrder;
          return;
        }

        // При обновлении страницы после добавления нового комментария - убираем дубли
        const existingIds = new Set(
          state.comments.map((comment) => comment.id),
        );

        const newComments = action?.payload?.data?.filter(
          (comment) => !existingIds.has(comment.id),
        );

        state.total = action?.payload?.meta?.page?.total as number;

        if (newComments?.length === 1) {
          state.comments = [...newComments, ...state.comments];

          return;
        }

        state.comments = [...state.comments, ...(newComments as IComment[])];
      },
    );

    builder.addMatcher(
      commentsApi.endpoints.getCommentReplies.matchFulfilled,
      (state, action) => {
        const { commentId } = action.meta.arg.originalArgs;
        const commentStateReplies = state.commentReplies[commentId] || [];

        // При обновлении страницы после добавления нового комментария - убираем дубли
        const existingIds = new Set(
          commentStateReplies.map((comment) => comment.id),
        );
        const newReplies = action?.payload?.data?.filter(
          (reply) => !existingIds.has(reply.id),
        );

        state.comments = state.comments.map((comment) => ({
          ...comment,
          subCommentsCount:
            comment.id === commentId
              ? action?.payload?.meta?.page?.total
              : comment.subCommentsCount,
          hasSubComments:
            comment.id === commentId ? true : comment.hasSubComments,
        }));

        if (newReplies?.length === 1) {
          state.commentReplies[commentId] = [
            ...newReplies,
            ...commentStateReplies,
          ];

          return;
        }

        state.commentReplies[commentId] = [
          ...commentStateReplies,
          ...(newReplies as IComment[]),
        ];
      },
    );

    builder.addMatcher(
      commentsApi.endpoints.postCommentReaction.matchFulfilled,
      (state, action) => {
        const emotionId = action.meta.arg.originalArgs.emotionId as TEmotionIds;
        const { commentId } = action.meta.arg.originalArgs;

        const isCommentChanged = state.comments.some(
          (comment) => comment.id === action.meta.arg.originalArgs.commentId,
        );

        if (isCommentChanged) {
          state.comments = state.comments.map((comment) => {
            if (comment.id === commentId) {
              const userReaction = comment?.reactions?.userReaction?.emotionId;

              return {
                ...comment,
                reactions: {
                  ...comment.reactions,
                  all: addCommentsLikes(
                    comment.reactions as IReactions,
                    emotionId,
                    userReaction,
                  ),
                  userReaction:
                    String(userReaction) === emotionId
                      ? null
                      : {
                        count: 1,
                        emotionId,
                      },
                },
              };
            }

            return comment;
          });
        }

        // Если комментарий не основной, ищем в subcomments
        Object.keys(state.commentReplies).forEach((parentId) => {
          const subComments = state.commentReplies[parentId];

          // Обновляем нужный subComment
          state.commentReplies[parentId] = subComments.map((subComment) => {
            if (subComment?.id === commentId) {
              const userReaction = subComment?.reactions?.userReaction?.emotionId;

              return {
                ...subComment,
                reactions: {
                  ...subComment.reactions,
                  all: addCommentsLikes(
                    subComment.reactions as IReactions,
                    emotionId,
                    userReaction,
                  ),
                  userReaction:
                    String(userReaction) === emotionId
                      ? null
                      : {
                        count: 1,
                        emotionId,
                      },
                },
              };
            }
            return subComment;
          });
        });
      },
    );

    builder.addMatcher(
      commentsApi.endpoints.patchComment.matchFulfilled,
      (state, action) => {
        if (action.payload.data.replyTo) {
          const parentCommentId = action.payload.data.replyTo;
          state.commentReplies[parentCommentId] = state.commentReplies[
            parentCommentId
          ].map((reply) => ({
            ...reply,
            text:
              reply.id === action.payload.data.id
                ? action.payload.data.text
                : reply.text,
          }));

          return;
        }

        state.comments = state.comments.map((comment) => ({
          ...comment,
          text:
            comment.id === action.payload.data.id
              ? action.payload.data.text
              : comment.text,
        }));
      },
    );

    builder.addMatcher(
      commentsApi.endpoints.deleteComment.matchFulfilled,
      (state, action) => {
        const { commentId } = action.meta.arg.originalArgs;

        if (state?.deletedComment?.replyTo) {
          const parentCommentId = state?.deletedComment?.replyTo;
          state.commentReplies[parentCommentId] = state.commentReplies[
            parentCommentId
          ].filter((reply) => reply.id !== commentId);

          state.comments = state.comments.map((comment) => ({
            ...comment,
            subCommentsCount:
              comment.id === parentCommentId
                ? (comment.subCommentsCount as number) - 1
                : comment.subCommentsCount,
            hasSubComments: (comment.subCommentsCount as number) > 1,
          }));

          state.deletedComment = { id: null };

          return;
        }

        state.comments = state.comments.filter(
          (comment) => comment.id !== commentId,
        );

        state.deletedComment = { id: null };
      },
    );

    builder.addMatcher(
      videoApi.endpoints.getVideoById.matchFulfilled,
      (state, action) => {
        state.total = action?.payload?.video?.comments?.count as number;
      },
    );
  },
});

export const {
  setCommentReplies,
  setComments,
  deleteCommentReplies,
  deleteComments,
  setDeletingComment,
} = videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
