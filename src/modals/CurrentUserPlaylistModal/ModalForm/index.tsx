import {
  FC,
  memo,
  useCallback,
  useEffect,
} from 'react';

// @ts-expect-error ошибка
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useValidationBlacklist } from '@/shareds/hooks/useValidationBlacklist';
import { isBlackListError } from '@/entities/Comment/model/hooks/useCommentValidation';
import { z } from 'zod';
import { TitleFormField } from './TitleFormField';
import { ButtonsFormField } from './ButtonsFormField';
import { useTranslation } from 'next-i18next';
import { TFunction } from 'i18next';

export type PlaylistFormData = {
  title: string;
  description?: string;
};

export type FormSubmitData = {
  title?: string;
  description?: string;
};

const resolver = (t: TFunction<'translation', undefined>) => zodResolver(
  z.object({
    title: z.string()
      .min(1, t('Modal_Form_Component_Resolver_Playlist_Name'))
      .min(4, t('Modal_Form_Component_Resolver_Too_Short'))
      .max(100, { message: t('Modal_Form_Component_Resolver_Too_Long') }),
    // description: z.string().nullable(),
  }),
);

type ModalFormComponentProps = {
  submitButtonTitle: string;
  defaultValues: PlaylistFormData,
  isLoading: boolean;
  onSubmit: (data: PlaylistFormData) => void;
  onCancel: () => void;
  dti?: string
  id?: string
};

const ModalFormComponent: FC<ModalFormComponentProps> = ({
  submitButtonTitle,
  defaultValues,
  isLoading,
  onSubmit: handleSubmit,
  onCancel: handleCancel,
  dti,
  id,
}) => {
  const { t } = useTranslation();
  const {
    control,
    resetField,
    reset,
    formState: { errors },
    clearErrors,
    setError,
    trigger,
    getValues,
  } = useForm<FormSubmitData>({
    resolver: resolver(t),
    reValidateMode: 'onSubmit',
  });

  const {
    disabledSubmit,
    handleSubmit: handleSubmitForm,
    handleBlur,
    loadingSubmit,
    handleChange,
  } = useValidationBlacklist({
    fieldNames: ['title', 'description'],
    setError,
    trigger,
    clearErrors,
    getValues,
    errors,
  });

  const currentId = id && `_${id}`;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  const handleReset = useCallback(
    () => {
      resetField('title');
      resetField('description');

      handleCancel();
    },
    [resetField, handleCancel],
  );

  const onSubmit = useCallback(async (valuesForm: FormSubmitData) => {
    handleSubmit({
      title: valuesForm.title ?? '',
      description: valuesForm.description,
    });
  }, [handleSubmit]);

  return (
    <form
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmitForm(onSubmit)}
    >
      <TitleFormField
        id={currentId}
        dti={dti}
        control={control}
      />
      <ButtonsFormField
        id={currentId}
        dti={dti}
        submitButtonTitle={submitButtonTitle}
        isLoading={isLoading || loadingSubmit}
        onReset={handleReset}
        isDisabled={
          (!!errors.title && !isBlackListError(errors.title.type)) || disabledSubmit
        }
      />
    </form>
  );
};

export const ModalForm = memo(ModalFormComponent);
