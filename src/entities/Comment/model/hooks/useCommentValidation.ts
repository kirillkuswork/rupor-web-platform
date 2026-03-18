import { BLACK_LIST_ERROR, BLACK_LIST_ERROR_MESSAGE, INITIAL_BLACK_LIST_ERROR } from '@/shareds/constants/blackList';

import { RegisterOptions, useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useValidationBlacklist } from './useValidationBlackList';

const BlackListErrorTypes = [
  BLACK_LIST_ERROR, INITIAL_BLACK_LIST_ERROR,
] as (string | undefined)[];

export const MAX_COMMENT_LENGTH = 5000;

export const CommentTextFormValidation: RegisterOptions = {
  required: true,
  minLength: 1,
  maxLength: MAX_COMMENT_LENGTH,
  validate: (value) => Boolean(value.trim().length),
};

export enum PostCommentFromFields {
  commentText = 'commentText',
}

export type PostCommentFromDataType = Record<PostCommentFromFields, string>;

export const isBlackListError = (type?: string) => BlackListErrorTypes.includes(type);

export const isInitialBlackListError = (type?: string) => (
  type === INITIAL_BLACK_LIST_ERROR
);

// TODO:: Отрефакторить, а лучше сжечь к херам собачьим
export const useCommentValidation = () => {
  const { t } = useTranslation();

  const {
    control,
    reset: handleReset,
    formState: { errors },
    setError,
    watch,
    clearErrors,
    trigger,
    getValues,
  } = useForm<PostCommentFromDataType>({
    defaultValues: {
      [PostCommentFromFields.commentText]: '',
    },
  });

  const {
    loadingSubmit,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useValidationBlacklist({
    fieldNames: [PostCommentFromFields.commentText],
    setError,
    clearErrors,
    errors,
    trigger,
    getValues,
  });

  const commentText: string = watch('commentText');
  const hasReachedMaxLetters = commentText.length > MAX_COMMENT_LENGTH;

  const getErrorMessage = useMemo(() => {
    const error = errors.commentText;

    if (error?.type === 'required') {
      return t('Comment_Error_Form_Validation_Text_Min');
    }

    if (isBlackListError(error?.type)) {
      return BLACK_LIST_ERROR_MESSAGE;
    }

    if (error?.type === 'maxLength' || hasReachedMaxLetters) {
      return t('Comment_Error_Form_Validation_Text_Max');
    }

    return '';
  }, [errors.commentText, hasReachedMaxLetters]);

  const isError = useMemo(() => {
    const error = errors.commentText;

    return !!getErrorMessage && !isInitialBlackListError(error?.type);
  }, [errors.commentText, getErrorMessage]);

  const highlights = useMemo(() => {
    const error = errors.commentText;

    return isBlackListError(error?.type) && error?.message ? JSON.parse(error.message) : undefined;
  }, [errors.commentText]);

  return {
    isError,
    getErrorMessage,
    highlights,
    errors,
    handleReset,
    handleSubmit,
    handleBlur,
    control,
    handleChange,
    loadingSubmit,
    textLength: commentText.length,
  };
};
