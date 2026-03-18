import React, { useRef, useState, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from 'rupor-ui-kit';
import { useLazyRegDeclareQuery } from '@/redux/services/auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAuthModal } from '@/providers/AuthModalProvider';
import { useSendYmMetrics } from 'rupor-common';
import { z } from 'zod';
import { SwitchPasswordVisibility } from '@/shareds';
import { compareHashAndPassword } from '@/shareds/lib/helpers/compareHashAndPassword';

import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';
import { CommonLanguages } from '@/shareds/constants/languages';
import { blockedTime } from '@/shareds/lib/utils/blockedTime';
import { getMinutesLeft } from '@/shareds/lib/utils/getMinutesLeft/getMinutesLeft';
import { BackendError } from '../../types/index';
import {
  BackButton,
  ButtonsWrapper, ErrorMessage, InformationText,
  InputsWrapper,
} from '../../ui';
import { registrationSchema } from '../../consts/user';

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const Registration = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    trigger,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { t, i18n } = useTranslation();
  const { openModal, updateModalParams, modalParams } = useAuthModal();
  const [lazyDeclareRegistration, { isFetching }] = useLazyRegDeclareQuery();
  const confirmPasswordTimer = useRef<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { sendYmMetric } = useSendYmMetrics();

  const language = i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En;

  const handelOnBackBtnClick = useCallback(() => {
    sendYmMetric({ // метрика 2.2.13 Пользователь нажимает на кнопку Назад в шторке регистрации.
      event_group: 'event',
      event_category: 'reg',
      event_label: 'telefon_ili_pochta',
      event_name: 'reg-button_click-telefon_ili_pochta',
      event_action: 'button_click',
      event_context: 'nazad',
      event_element_location: 'popup',
    });
    openModal('login');
  }, [openModal]);

  const onSubmit = async (data: RegistrationFormData) => {
    console.log("%%% otpravit_kod %%%")
    sendYmMetric({ // метрика 2.2.12 Пользователь нажимает на кнопку Отправить код после ввода всех данных в шторке регистрации.
      event_group: 'event',
      event_category: 'reg',
      event_label: 'telefon_ili_pochta',
      event_name: 'reg-button_click-telefon_ili_pochta',
      event_action: 'button_click',
      event_context: 'otpravit_kod',
      event_element_location: 'popup',
    });
    try {
      const hashedPassword = await compareHashAndPassword(data.password);

      const res = await lazyDeclareRegistration({
        user: { name: data.name },
        service: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
        input: data.email,
        language,
        password: hashedPassword,
      }).unwrap();

      if (res) {
        updateModalParams({ confirmCodeId: res?.confirmCodeId });
        openModal('otp', {
          ...modalParams,
          ...{
            confirmCodeId: res?.confirmCodeId,
            type: 'registrationConfirmationInfo',
            login: data.email,
            language,
            password: hashedPassword,
            name: data.name,
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
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t('Modal_Registration_Input_Label')}
              error={!!errors.name}
              errorMsg={errors.name ? t(errors.name.message!) : ''}
              onChange={(e) => {
                field.onChange(e);
                if (errors.root) clearErrors();
              }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
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
                if (errors.root) clearErrors();
              }}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              postfix={(
                <SwitchPasswordVisibility
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  showPassword={showConfirmPassword}
                />
              )}
              label={t('Auth_Modal_Confirm_Password_Input')}
              type={showConfirmPassword ? 'text' : 'password'}
              error={!!errors.confirmPassword}
              errorMsg={
                errors.confirmPassword ? t(errors.confirmPassword.message!) : ''
              }
              onChange={(e) => {
                field.onChange(e);
                if (confirmPasswordTimer.current) {
                  clearTimeout(confirmPasswordTimer.current);
                }
                confirmPasswordTimer.current = window.setTimeout(() => {
                  trigger('confirmPassword');
                }, 500);
                if (errors.root) clearErrors();
              }}
              onBlur={(e) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                field.onBlur(e);
                if (confirmPasswordTimer.current) {
                  clearTimeout(confirmPasswordTimer.current);
                  confirmPasswordTimer.current = null;
                }
                trigger('confirmPassword');
              }}
            />
          )}
        />
      </InputsWrapper>
      <ButtonsWrapper>
        <Button
          data-testid="registration-submit-button"
          type="submit"
          label={t('Auth_Modal_Send_Code_Button')}
          loading={isFetching}
          fullWidth
          disabled={isSubmitDisabled}
        />
        <BackButton
          dti="registration-back-button"
          title={t('Modal_Registration_Cancel_Button_Title')}
          isDisabled={isFetching}
          onClick={handelOnBackBtnClick}
        />
      </ButtonsWrapper>
      <InformationText
        text={formatInformationText(
          t('Modal_Registration_Consent', {
            linkUrl: '#',
          }),
        )}
      />
    </form>
  );
};
