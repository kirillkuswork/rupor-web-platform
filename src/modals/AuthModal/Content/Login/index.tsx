import React from 'react';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Input, Notification } from 'rupor-ui-kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAuthModal } from '@/providers/AuthModalProvider';
import { useLazyLoginQuery } from '@/redux/services/auth';
import { useRefreshDataAfterLogout } from '@/shareds/hooks/useRefreshDataAfterLogout';
import { SwitchPasswordVisibility } from '@/shareds';
import { compareHashAndPassword } from '@/shareds/lib/helpers/compareHashAndPassword';

import { useSendYmMetrics } from 'rupor-common';

import { CommonLanguages } from '@/shareds/constants/languages';
import { blockedTime } from '@/shareds/lib/utils/blockedTime';
import { useLazyGetMeInfoQuery } from '@/redux/services/users';
import { getMinutesLeft } from '@/shareds/lib/utils/getMinutesLeft/getMinutesLeft';
import { BackendError } from '../../types/index';
import {
  ButtonsWrapper, ErrorMessage,
  InputsWrapper,
} from '../../ui';
import { loginSchema } from '../../consts/user';

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { i18n, t } = useTranslation();
  const { openModal, closeModal } = useAuthModal();
  const [login, { isFetching }] = useLazyLoginQuery();
  const [getUserInfo] = useLazyGetMeInfoQuery();
  const callback = useRefreshDataAfterLogout();
  const [showPassword, setShowPassword] = React.useState(false);
  const { sendYmMetric } = useSendYmMetrics();

  const handelOnRegistrationClick = useCallback(() => {
    sendYmMetric({ // метрика 2.2.7 Пользователь нажимает на кнопку Зарегистрироваться в шторке авторизации
      event_group: 'event',
      event_category: 'auth',
      event_label: 'telefon_ili_pochta',
      event_name: 'auth-button_click-telefon_ili_pochta',
      event_action: 'button_click',
      event_context: 'zaregistrirovatsya',
      event_element_location: 'popup',
    });
    openModal('registration');
  }, [openModal]);

  const handelOnRecoveryClick = useCallback(() => {
    /*sendYmMetric({
      event_group: 'event',
      event_category: 'auth',
      event_label: 'zakryt',
      event_name: 'auth-element_click-zakryt',
      event_action: 'button_click',
      event_element_location: 'popup',
    });*/
    openModal('recovery');
  }, [openModal]);

  const language = i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En;

  const onSubmit = async (data: LoginFormData) => {
    const hashedPassword = await compareHashAndPassword(data.password);
    sendYmMetric({ // метрика 2.2.6 Пользователь нажимает на кнопку Войти после ввода логина и пароля в шторке авторизации
      event_group: 'event',
      event_category: 'auth',
      event_label: 'telefon_ili_pochta',
      event_name: 'auth-button_click-telefon_ili_pochta',
      event_action: 'button_click',
      event_context: 'voiti',
      event_element_location: 'popup',
    });
    try {
      const res = await login({
        service: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
        input: data.email,
        password: hashedPassword,
        language,
      }).unwrap();

      if (res) {
        sendYmMetric({ // метрика 2.2.9 Успешная авторизация с помощью email. Событие срабатывает после отправки данных на сервер о введеннии правильного кода/пароля.
          event_group: 'event',
          event_category: 'auth',
          event_label: 'avtorizaciya',
          event_name: 'auth-success-avtorizaciya',
          event_action: 'success',
          event_context: 'email',
        });
        getUserInfo();

        Notification.add({
          content: t('Auth_Modal_Notification_Auth_Succeeded'),
          duration: 3000,
        });
        callback?.();
        closeModal();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (err: never) {
      const backendErrors: BackendError[] = err?.data?.errors;

      if (backendErrors[0].httpStatusCode === 429) {
        const time = getMinutesLeft(backendErrors[0].message);
        setError('root', { type: 'manual', message: blockedTime({ text: 'Auth_Modal_Exhausted_Attempt_Error', time, t }) });
      }
      if (backendErrors[0].httpStatusCode === 403) {
        setError('root', { type: 'manual', message: t('Auth_Modal_Incorrect_Email_Or_Password_Error') });
      }
    }
  };

  const isSubmitDisabled = isFetching || Object.keys(errors).length > 0;

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
                clearErrors();
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              postfix={(
                <SwitchPasswordVisibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  showPassword={showPassword}
                />
              )}
              label={t('Auth_Modal_Password_Input')}
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              errorMsg={errors.password ? t(errors.password.message!) : ''}
              onChange={(e) => {
                field.onChange(e);
                clearErrors();
              }}
            />
          )}
        />
      </InputsWrapper>
      <ButtonsWrapper>
        <Button
          data-testid="login-submit-button"
          type="submit"
          label={t('Common_enter')}
          loading={isFetching}
          fullWidth
          disabled={isSubmitDisabled}
        />
        <Button
          data-testid="login-registration-button"
          type="button"
          variant="secondary"
          label={t('Auth_Modal_Registration_Button')}
          onClick={handelOnRegistrationClick}
        />
        <Button
          data-testid="forgot-password-button"
          type="button"
          variant="quaternary"
          label={t('Auth_Modal_Recovery_Button')}
          onClick={handelOnRecoveryClick}
        />
      </ButtonsWrapper>
    </form>
  );
};
