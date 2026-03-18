import { Button, ReplyCommentForm } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import clsx from 'clsx';
import {
  CommentTextFormValidation,
  MAX_COMMENT_LENGTH,
  PostCommentFromDataType,
  PostCommentFromFields,
  useCommentValidation,
} from '../model/hooks/useCommentValidation';

interface IChangeCommentToVideoProps {
  onPostComment: (text: string) => void;
  onCloseCommentForm: (param: boolean) => void;
  className?: string;
  dti?: string;
}

export const CommentChangeForm = (props: IChangeCommentToVideoProps) => {
  const { onPostComment, className, onCloseCommentForm, dti } = props;

  const { isAuth } = useSelector(selectors.userSelector);

  const { t } = useTranslation();

  const {
    isError,
    getErrorMessage,
    highlights,
    errors,
    handleReset,
    handleSubmit,
    control,
    handleChange,
    loadingSubmit,
  } = useCommentValidation();

  const onSubmit = async (formData: PostCommentFromDataType) => {
    if (isAuth) {
      onCloseCommentForm(false);
      if (errors.commentText) return;
      onPostComment(formData.commentText);
    }
    handleReset();
  };

  const handlePost = async () => {
    await handleSubmit(onSubmit)(null);
  };

  // Чистим форму при размаунте компонента
  useEffect(() => handleReset, []);

  return (
    <ReplyCommentForm.Container className={clsx(
      '!grid-cols-1',
      className,
    )}
    >
      <ReplyCommentForm.InputWrapper>
        <Controller
          name={PostCommentFromFields.commentText}
          rules={CommentTextFormValidation}
          control={control}
          render={({ field }) => (
            <ReplyCommentForm.Input
              {...field}
              onChange={(event) => {
                handleChange(event);
                field.onChange(event);
              }}
              placeholder={t('Comment_Add_Placeholder') as string}
              error={isError}
              errorMsg={getErrorMessage}
              onKeyDown={(e) => e.stopPropagation()}
              onPressEnter={handlePost}
              maxLettersCount={MAX_COMMENT_LENGTH}
              showLettersCountThreshold={100}
              highlights={highlights}
              className="!min-h-[93px] !md:min-h-[113px] mx-[1px]"
              data-testid={`${dti}-comment-change-input`}
            />
          )}
        />
        <ReplyCommentForm.ButtonsWrapper>
          <Button
            dti={`${dti}-comment-change-cancel-button`}
            size="small"
            variant="quaternary"
            onClick={() => {
              handleReset();
              onCloseCommentForm(false);
            }}
          >
            {t('Common_cancel')}
          </Button>
          <Button dti={`${dti}-comment-change-save-button`} size="small" loading={loadingSubmit} onClick={handlePost}>
            {t('Common_Save')}
          </Button>
        </ReplyCommentForm.ButtonsWrapper>
      </ReplyCommentForm.InputWrapper>
    </ReplyCommentForm.Container>
  );
};
