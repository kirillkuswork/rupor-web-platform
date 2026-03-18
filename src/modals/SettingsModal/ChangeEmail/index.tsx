import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button, Input } from 'rupor-ui-kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSettingsModal } from '@/app/providers/SettingsProvider';

import { blockedTime } from '@/shareds/lib/utils/blockedTime';
import { CommonLanguages } from '@/shareds/constants/languages';
import { BackendError } from '@/modals/SettingsModal/types';
import { useLazyUserCredentialsDeclareQuery } from '@/redux/services/users';
import { getMinutesLeft } from '@/shareds/lib/utils/getMinutesLeft/getMinutesLeft';
import { changeEmailSchema } from '../consts';
import { ErrorMessage, InputsWrapper } from '../ui';

type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;

export const ChangeEmail = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    trigger,
    formState: { errors },
  } = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });
  const emailTimer = useRef<number | null>(null);
  const hasBeenEdited = useRef<boolean>(false);
  const [credentialsDeclare, { isFetching }] = useLazyUserCredentialsDeclareQuery();
  const { openModal, modalParams } = useSettingsModal();
  const { t, i18n } = useTranslation();

  const language = i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En;

  const onSubmit = async (data: ChangeEmailFormData) => {
    try {
      const res = await credentialsDeclare({
        service: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
        input: data.email,
        language,
      }).unwrap();

      if (res) {
        openModal('otp', {
          ...modalParams,
          confirmCodeId: res.confirmCodeId,
          type: 'emailType',
          login: data.email,
          expiredTime: res.expired,
        });
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
      const backendErrors: BackendError[] = error?.data?.errors;

      if (backendErrors[0].httpStatusCode === 429) {
        const time = getMinutesLeft(backendErrors[0].message);
        setError('root', {
          type: 'manual',
          message: blockedTime({ text: 'Auth_Modal_Exhausted_Email_Attempt_Error', time, t }),
        });
      }
      if (backendErrors[0].httpStatusCode === 403) {
        setError('email', { type: 'manual', message: t('Auth_Modal_Incorrect_Email_Error') });
      }
    }
  };

  const emailValue = useWatch({
    control,
    name: 'email',
  });

  useEffect(() => {
    if (emailValue !== '' && !hasBeenEdited.current) {
      hasBeenEdited.current = true;
    }

    if (emailValue === '' && hasBeenEdited.current) {
      setError('email', {
        type: 'manual',
        message: t('Auth_Modal_Email_Empty_Error'),
      });
    } else if (emailValue !== '') {
      clearErrors('email');
      trigger('email');
    }
  }, [emailValue, clearErrors, setError, t, trigger]);

  const isSubmitDisabled = isFetching || Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <ErrorMessage errorMsg={errors.root.message!} className="mt-3" />
      )}
      <InputsWrapper>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t('Email')}
              autoFocus
              error={!!errors.email}
              errorMsg={errors.email ? t(errors.email.message!) : ''}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value !== '') {
                  hasBeenEdited.current = true;
                }
                if (emailTimer.current) {
                  clearTimeout(emailTimer.current);
                }
                emailTimer.current = window.setTimeout(() => {
                  if (e.target.value === '' && hasBeenEdited.current) {
                    setError('email', {
                      type: 'manual',
                      message: t('Auth_Modal_Email_Empty_Error'),
                    });
                  } else if (e.target.value !== '') {
                    trigger('email');
                  } else {
                    clearErrors('email');
                  }
                }, 500);
                if (errors.root) clearErrors('root');
              }}
            />
          )}
        />
      </InputsWrapper>
      <Button
        className="mt-12"
        data-testid="change-email-submit-button"
        type="submit"
        label={t('Settings_Change_Modal_Next_Button')}
        loading={isFetching}
        fullWidth
        disabled={isSubmitDisabled}
      />
    </form>
  );
};
