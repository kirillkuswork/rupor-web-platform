import { useTranslation } from 'react-i18next';
import { useAuthModal } from '@/providers/AuthModalProvider';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'rupor-ui-kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLazyResetDeclareQuery } from '@/redux/services/auth';
import { blockedTime } from '@/shareds/lib/utils/blockedTime';
import { CommonLanguages } from '@/shareds/constants/languages';
import { getMinutesLeft } from '@/shareds/lib/utils/getMinutesLeft/getMinutesLeft';
import { recoverySchema } from '../../consts/user';
import {
  BackButton, ButtonsWrapper, ErrorMessage, InputsWrapper,
} from '../../ui';
import { BackendError } from '../../types/index';

type RecoveryFormData = z.infer<typeof recoverySchema>;

export const Recovery = () => {
  const { i18n, t } = useTranslation();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RecoveryFormData>({
    resolver: zodResolver(recoverySchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const { openModal, modalParams } = useAuthModal();
  const [reset, { isFetching }] = useLazyResetDeclareQuery();
  const language = i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En;
  const isSubmitDisabled = isFetching || Object.keys(errors).length > 0;

  const onSubmit = async (data: RecoveryFormData) => {
    try {
      const res = await reset({
        service: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
        input: data.email,
        language,
      }).unwrap();

      if (res) {
        openModal('otp', {
          ...modalParams,
          ...{
            confirmCodeId: res?.confirmCodeId,
            type: 'resetConfirmationInfo',
            login: data.email,
            language,
            expiredTime: res.expired,
          },
        });
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
      const backendErrors: BackendError[] = error?.data?.errors;

      if (backendErrors[0].httpStatusCode === 429) {
        const time = getMinutesLeft(backendErrors[0].message);
        return setError('root', { type: 'manual', message: blockedTime({ text: 'Auth_Modal_Exhausted_Email_Attempt_Error', time, t }) });
      }
      if (backendErrors[0].httpStatusCode === 403) {
        return setError('root', { type: 'manual', message: t('Auth_Modal_Incorrect_Email_Error') });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <ErrorMessage errorMsg={errors.root.message!} className="mt-3" />}
      <InputsWrapper>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              autoFocus
              label={t('Auth_Modal_Email_Input')}
              maxLength={256}
              error={!!errors.email}
              errorMsg={errors.email ? t(errors.email.message!) : ''}
              onChange={(e) => {
                field.onChange(e);
                if (errors.root) clearErrors();
              }}
            />
          )}
        />
      </InputsWrapper>

      <ButtonsWrapper>
        <Button
          data-testid="reset-submit-button"
          type="submit"
          label={t('Modal_Login_Submit_Button_Title')}
          loading={isFetching}
          fullWidth
          disabled={isSubmitDisabled}
        />
        <BackButton
          dti="reset-back-button"
          title={t('Modal_Registration_Cancel_Button_Title')}
          isDisabled={isFetching}
          onClick={() => openModal('login')}
        />
      </ButtonsWrapper>

    </form>
  );
};
