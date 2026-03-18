import { Button, ReplyCommentForm } from 'rupor-ui-kit';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { useTranslation } from 'next-i18next';
import { FocusEvent, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useAuthWarning } from '@/shareds/hooks/useAuthWarning';
import {
  CommentTextFormValidation,
  MAX_COMMENT_LENGTH,
  PostCommentFromDataType,
  PostCommentFromFields,
  useCommentValidation,
} from '../model/hooks/useCommentValidation';

interface IAddCommentToVideoProps {
  onPostComment: (text: string) => void;
  className?: string;
  authorId?: string;
  dti?: string;
}

// TODO:: скорее всего ава текущего пользователя будет постоянно хранится в сторе
// доделать, когда сделаем авторизацию
const avatarUrl = '';

export const CommentForm = (props: IAddCommentToVideoProps) => {
  const { onPostComment, className, authorId, dti } = props;

  const { isAuth } = useSelector(selectors.userSelector);
  const [isOpen, setIsOpen] = useState(false);
  const { openAuthWarning } = useAuthWarning();

  const { t } = useTranslation();

  const onFocus = () => {
    if (!isAuth) {
      openAuthWarning(t('Comment_Form_Auth_Warning'), 'not-auth-add-comment');
    }
    setIsOpen(true);
  };

  const {
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
    textLength,
  } = useCommentValidation();

  const onBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    handleBlur(e);
  };

  const onSubmit = async (formData: PostCommentFromDataType) => {
    if (!isAuth) {
      setIsOpen(false);
      handleReset();
      return;
    }

    if (errors.commentText) {
      return;
    }
    const text = formData.commentText;
    setIsOpen(false);
    onPostComment(text);
    handleReset();
  };

  const handlePost = async () => {
    await handleSubmit(onSubmit)(null);
  };

  // Чистим форму при размаунте компонента
  useEffect(() => () => handleReset(), []);

  const dataTestId = dti || 'video-comments-comment';

  return (
    <ReplyCommentForm.Container className={className}>
      <ReplyCommentForm.Avatar
        src={imgProxy({
          imgUrl: avatarUrl,
        })}
      />
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
              rows={!isOpen ? 1 : undefined}
              highlights={highlights}
              onFocus={onFocus}
              onBlur={onBlur}
              className={isOpen ? 'min-h-[93px] md:min-h-[113px]' : ''}
              data-testid={`${dataTestId}-input_${authorId}`}
            />
          )}
        />
        {isOpen && (
          <ReplyCommentForm.ButtonsWrapper>
            <Button
              dti={`${dataTestId}-cancel-button_${authorId}`}
              size="small"
              variant="quaternary"
              onClick={() => {
                handleReset();
                setIsOpen(false);
              }}
            >
              {t('Common_cancel')}
            </Button>
            <Button
              dti={`${dataTestId}-sent-button_${authorId}`}
              disabled={!isAuth || !textLength}
              size="small"
              loading={loadingSubmit}
              onClick={handlePost}
            >
              {t('Common_addComment')}
            </Button>
          </ReplyCommentForm.ButtonsWrapper>
        )}
      </ReplyCommentForm.InputWrapper>
    </ReplyCommentForm.Container>
  );
};
