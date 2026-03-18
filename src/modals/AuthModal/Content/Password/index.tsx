import React, { useRef, useState } from 'react';
import { useAuthModal } from '@/providers/AuthModalProvider';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Notification } from 'rupor-ui-kit';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyResetConfirmQuery } from '@/redux/services/auth';
import { z } from 'zod';
import { useRefreshDataAfterLogout } from '@/shareds/hooks/useRefreshDataAfterLogout';
import { SwitchPasswordVisibility } from '@/shareds';
import { compareHashAndPassword } from '@/shareds/lib/helpers/compareHashAndPassword';
import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';
import { resetPasswordSchema } from '../../consts/user';
import {
  ButtonsWrapper,
  ErrorMessage,
  InformationText,
  InputsWrapper,
} from '../../ui';

import { useSendYmMetrics } from 'rupor-common';

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const Password = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onSubmit',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { t } = useTranslation();
  const { closeModal, modalParams } = useAuthModal();
  const [reset, { isFetching }] = useLazyResetConfirmQuery();
  const confirmPasswordTimer = useRef<number | null>(null);
  const callback = useRefreshDataAfterLogout();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { sendYmMetric } = useSendYmMetrics();

  const { confirmCodeId, confirmCodeValue } = modalParams;

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const hashedPassword = await compareHashAndPassword(data.password);

      const res = await reset({
        confirmCodeValue,
        confirmCodeId,
        password: hashedPassword,
      }).unwrap();

      if (res) {
        Notification.add({
          content: t('Auth_Modal_Notification_Password_Changed'),
          duration: 3000,
        });
        callback?.();
        closeModal();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (err: never) {
      Notification.add({
        content: t('Common_error'),
        duration: 3000,
      });
    }
  };

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
          data-testid="reset-password-submit-button"
          type="submit"
          label={t('Auth_Modal_Save_Button')}
          loading={isFetching}
          fullWidth
          disabled={isSubmitDisabled}
        />
        <Button
          data-testid="reset-password-cancel-button"
          type="button"
          variant="secondary"
          label={t('Auth_Modal_Cancel_Button')}
          onClick={() => closeModal()}
        />
      </ButtonsWrapper>
      <InformationText text={formatInformationText(
        t('Modal_Password_Consent', {
          linkUrl: '#',
        }),
      )}
      />
    </form>
  );
};
