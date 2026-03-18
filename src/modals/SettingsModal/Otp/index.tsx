import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supportEmail } from '@/shareds/constants/paths';
import { Notification } from 'rupor-ui-kit';
import {
  BackButton,
  CountdownTimer,
  InformationText,
  otpConsts,
  OTPInputField,
  RetryCodeButton,
  Spinner,
  useComponentsVisibility,
  useParseErrorMessage,
} from '@/features/Otp';
import { OTPInputFieldSkeleton } from '@/features/Otp/components/OTPInputField/OTPInputFieldSkeleton';
import {
  BackendError,
  UseConfirmErrorCode,
  UseDeclareErrorCode,
} from '@/features/Otp/types';

import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';
import {
  SettingsModalType,
  useSettingsModal,
} from '@/app/providers/SettingsProvider';
import { CommonLanguages } from '@/shareds/constants/languages';
import {
  useLazyCurrentCredentialsQuery,
  useLazyUserChangeConfirmQuery,
} from '@/redux/services/users';
import { useSendYmMetrics, useConnectionStatus } from 'rupor-common';
import { useDeclareChangeEmail } from '../hooks/useDeclareChangeEmail';
import { useDeclareChangePassword } from '../hooks/useDeclareChangePassword';

const backButtonUrls = {
  passwordType: 'password',
  emailType: 'email',
};
const serviceType = 'CREDENTIAL_SERVICE_TYPE_EMAIL';

export const Otp = memo(() => {
  const {
    modalParams, updateModalParams, openModal, closeModal,
  } = useSettingsModal();
  const {
    login,
    confirmCodeId,
    password,
    type,
    attemptsConfirm,
    attemptsDeclare,
    confirmError,
    expiredTime,
    confirmCodeValue,
  } = modalParams;

  const { t, i18n } = useTranslation();
  const [confirm] = useLazyUserChangeConfirmQuery();
  const [updateUserInfo] = useLazyCurrentCredentialsQuery();
  const handleOnClose = useCallback(() => closeModal(), [closeModal]);
  const language = i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En;
  const { onReconnect, isOnline } = useConnectionStatus();

  const { sendYmMetric } = useSendYmMetrics();

  const confirmRequest = useCallback(
    async (code?: string) => {
      const res = await confirm({
        settingsType: type,
        confirmCodeId: confirmCodeId!,
        confirmCodeValue: code!,
      }).unwrap();

      if (res) {
        await updateUserInfo();
        updateModalParams({ confirmCodeValue: code });
        if (type === 'emailType') {
          console.log('%%%% EMAIL CHANGED %%%%!!!');
          sendYmMetric({
            // метрика 2.4.7 	Получен успех при завершении действия по смене email
            event_group: 'event',
            event_category: 'profile',
            event_label: 'redaktirovanie_email',
            event_name: 'profile-success-redaktirovanie_email',
            event_action: 'success',
          });
        }
        Notification.add({
          content: t(
            type === 'passwordType'
              ? 'Auth_Modal_Notification_Password_Changed'
              : 'Field_Type_To_Success_Email',
          ),
          duration: 3000,
        });
        handleOnClose();
      }
    },
    [
      confirm,
      confirmCodeId,
      handleOnClose,
      t,
      type,
      updateModalParams,
      updateUserInfo,
    ],
  );

  useEffect(
    () => onReconnect(async () => {
      await confirmRequest(confirmCodeValue);
    }),
    [confirmCodeValue, confirmRequest, onReconnect],
  );

  const declareChangeEmail = useDeclareChangeEmail?.({
    input: login!,
    language,
    service: serviceType,
  });

  const declareChangePassword = useDeclareChangePassword?.({
    service: serviceType,
    password: password!,
    language,
  });

  const declareHooks = type === 'emailType' ? declareChangeEmail : declareChangePassword;

  const { visibility, ...visibilityHandlers } = useComponentsVisibility();

  const { parseConfirmError } = useParseErrorMessage(attemptsConfirm!);

  const handleOnRetry = useCallback(() => {
    visibilityHandlers.handleOnDeclareSubmitStart();
    declareHooks?.load().then((error) => {
      if (error) {
        updateModalParams({
          ...modalParams,
          declareError: error,
        });

        visibilityHandlers.handleOnDeclareSubmitEnd(attemptsDeclare!, error);
      } else {
        visibilityHandlers.handleOnDeclareSubmitEnd(attemptsDeclare!);
      }
    });
  }, [
    visibilityHandlers,
    declareHooks,
    updateModalParams,
    modalParams,
    attemptsDeclare,
  ]);

  const handleOnSubmit = async (code: string) => {
    updateModalParams({ confirmCodeValue: code });
    if (!isOnline) {
      return Notification.add({
        containerClassName: '!bg-red !text-white',
        content: t('Offline_State_Error'),
      });
    }
    visibilityHandlers.handleOnConfirmSubmitStart();
    try {
      await confirmRequest(code);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
      const backendErrors: BackendError[] = error?.data?.errors;
      if (backendErrors[0]?.httpStatusCode === 500) {
        closeModal();
      }
      if (backendErrors[0]?.httpStatusCode === 429) {
        const blockedTime = backendErrors[0]?.message;
        openModal('information', {
          type,
          blockedTime,
        });
      } else {
        const err = backendErrors[0]?.code;
        const attempts = Number(backendErrors[0]?.message);
        updateModalParams({
          ...modalParams,
          confirmError: err,
          attemptsConfirm: attempts,
          attemptsDeclare: attempts,
        });
        visibilityHandlers.handleOnDeclareSubmitEnd(
          attempts,
          err as UseDeclareErrorCode,
        );
      }
    }
  };

  const isSubmit = declareHooks?.isLoading;

  return (
    <>
      {visibility.isOTPInputVisible ? (
        <OTPInputField
          length={otpConsts.OTP_INPUT_LENGTH}
          isSubmit={isSubmit!}
          errorMsg={parseConfirmError(confirmError as UseConfirmErrorCode)}
          onFullFilled={handleOnSubmit}
        />
      ) : (
        <OTPInputFieldSkeleton length={otpConsts.OTP_INPUT_LENGTH} />
      )}

      <CountdownTimer
        time={expiredTime!}
        isVisible={visibility.isCountdownTimerVisible}
        onStart={visibilityHandlers.handleOnCountdownTimerStart}
        onEnd={visibilityHandlers.handleOnCountdownTimerEnd}
      />

      <Spinner isVisible={visibility.isSpinnerVisible} />

      <InformationText
        isVisible={visibility.isInformationTextVisible}
        text={formatInformationText(
          t(otpConsts.registrationLocalesEmail.informationText, {
            email: supportEmail,
          }),
        )}
      />

      <RetryCodeButton
        isVisible={visibility.isRetryCodeButtonVisible}
        isLoading={isSubmit!}
        isDisabled={isSubmit!}
        onClick={handleOnRetry}
      />

      <BackButton
        isVisible={visibility.isBackButtonVisible}
        isLoading={false}
        isDisabled={false}
        onClick={() => {
          if (type) {
            openModal(backButtonUrls[type] as SettingsModalType);
          }
        }}
      />
    </>
  );
});

Otp.displayName = 'Otp';
