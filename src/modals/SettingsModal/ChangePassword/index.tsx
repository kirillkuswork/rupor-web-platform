import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button, Input } from 'rupor-ui-kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SwitchPasswordVisibility } from '@/shareds';
import { compareHashAndPassword } from '@/shareds/lib/helpers/compareHashAndPassword';
import { useSettingsModal } from '@/app/providers/SettingsProvider';
import { blockedTime } from '@/shareds/lib/utils/blockedTime';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { CommonCredentialServiceTypes } from '@/features/Auth/consts';
import { BackendError } from '@/modals/SettingsModal/types';
import { useLazyUserChangeDeclareQuery } from '@/redux/services/users';
import { CommonLanguages } from '@/shareds/constants/languages';
import { getMinutesLeft } from '@/shareds/lib/utils/getMinutesLeft/getMinutesLeft';
import { changePasswordSchema } from '../consts';
import { ErrorMessage, InputsWrapper } from '../ui';

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    trigger,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const passwordTimer = useRef<number | null>(null);
  const confirmPasswordTimer = useRef<number | null>(null);
  const [changeDeclare, { isFetching }] = useLazyUserChangeDeclareQuery();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { currentCredentials } = useSelector(selectors.userSelector);
  const [showPassword, setShowPassword] = useState(false);
  const { openModal, modalParams } = useSettingsModal();
  const { t, i18n } = useTranslation();
  const language = i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En;

  const email = currentCredentials?.find(
    ({ service }) => service === CommonCredentialServiceTypes.Email,
  )?.value;

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const hashedPassword = await compareHashAndPassword(data.password);
      const res = await changeDeclare({
        service: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
        password: hashedPassword,
        language,
      }).unwrap();

      if (res) {
        openModal('otp', {
          ...modalParams,
          ...{
            password: hashedPassword,
            confirmCodeId: res?.confirmCodeId,
            type: 'passwordType',
            login: email,
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
        return setError('root', {
          type: 'manual',
          message: blockedTime({
            text: 'Auth_Modal_Exhausted_Email_Attempt_Error',
            time,
            t,
          }),
        });
      }
      if (backendErrors[0].httpStatusCode === 403) {
        return setError('root', {
          type: 'manual',
          message: t('Auth_Modal_Incorrect_Email_Error'),
        });
      }
    }
  };

  const passwordValue = useWatch({
    control,
    name: 'password',
  });
  const confirmPasswordValue = useWatch({
    control,
    name: 'confirmPassword',
  });

  useEffect(() => {
    if (passwordValue === '') {
      clearErrors('password');
    }
  }, [passwordValue]);

  useEffect(() => {
    if (confirmPasswordValue === '') {
      clearErrors('confirmPassword');
    }
  }, [confirmPasswordValue]);

  useEffect(() => {
    if (passwordValue || confirmPasswordValue) {
      trigger('confirmPassword');
    }
  }, [passwordValue, confirmPasswordValue, trigger]);

  const isSubmitDisabled = isFetching || Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && (
        <ErrorMessage errorMsg={errors.root.message!} className="mt-3" />
      )}
      <InputsWrapper>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              autoFocus
              postfix={(
                <SwitchPasswordVisibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  showPassword={showPassword}
                />
              )}
              label={t('Settings_Change_Modal_New_Password_Input_Label')}
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              errorMsg={errors.password ? t(errors.password.message!) : ''}
              onChange={(e) => {
                field.onChange(e);
                if (passwordTimer.current) {
                  clearTimeout(passwordTimer.current);
                }
                passwordTimer.current = window.setTimeout(() => {
                  if (!e.target.value.length) {
                    return clearErrors('password');
                  }
                  trigger('password');
                }, 500);
                if (errors.root) clearErrors();
              }}
              onBlur={(e) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                field.onBlur(e);
                if (passwordTimer.current) {
                  clearTimeout(passwordTimer.current);
                  passwordTimer.current = null;
                }
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
                  if (!e.target.value.length) {
                    return clearErrors('confirmPassword');
                  }
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
                if (errors.root) clearErrors();
              }}
            />
          )}
        />
      </InputsWrapper>
      <Button
        className="mt-12"
        data-testid="change-password-submit-button"
        type="submit"
        label={t('Settings_Change_Modal_Next_Button')}
        loading={isFetching}
        fullWidth
        disabled={isSubmitDisabled}
      />
    </form>
  );
};
