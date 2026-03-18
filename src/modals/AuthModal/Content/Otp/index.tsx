import { memo, useCallback, useEffect } from 'react';
import { AuthModalType, useAuthModal } from '@/providers/AuthModalProvider';
import { useRefreshDataAfterLogout } from '@/shareds/hooks/useRefreshDataAfterLogout';
import { useLazyConfirmQuery } from '@/redux/services/auth';
import { useTranslation } from 'react-i18next';
import { supportEmail } from '@/shareds/constants/paths';
import { Notification } from 'rupor-ui-kit';
import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';
import { CommonLanguages } from '@/shareds/constants/languages';
import { useLazyGetMeInfoQuery } from '@/redux/services/users';
import {
  BackButton, CountdownTimer, InformationText, otpConsts, OTPInputField, RetryCodeButton, Spinner, useParseErrorMessage,
} from '@/features/Otp';
import { OTPInputFieldSkeleton } from '@/features/Otp/components/OTPInputField/OTPInputFieldSkeleton';
import { useActions } from '@/shareds/hooks/useActions';
import { userActions } from '@/redux/actions/userActions';
import { useSendYmMetrics, useConnectionStatus } from 'rupor-common';
import { BackendError } from '../../types/index';
import { useDeclareRecovery, useDeclareRegistration } from './hooks';
import { useComponentsVisibility } from './hooks/useComponentsVisibility';
import { UseConfirmErrorCode, UseDeclareErrorCode } from './types';

const backButtonUrls = {
  authConfirmationInfo: 'login',
  registrationConfirmationInfo: 'registration',
  resetConfirmationInfo: 'recovery',
  oneMinConfirmationInfo: '',
};

export const Otp = memo(() => {
  const {
    modalParams, updateModalParams, openModal, closeModal,
  } = useAuthModal();
  const {
    isPhone,
    login,
    name,
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
  const [confirm] = useLazyConfirmQuery();
  const [getUserInfo] = useLazyGetMeInfoQuery();
  const callback = useRefreshDataAfterLogout();
  const handleOnClose = useCallback(() => closeModal(), [closeModal]);
  const language = i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En;
  const { onReconnect } = useConnectionStatus();
  const { setAuthModalType } = useActions(userActions);

  const { sendYmMetric } = useSendYmMetrics();

  const confirmRequest = useCallback(async (code?: string) => {
    setAuthModalType(type);
    const res = await confirm({
      authType: type,
      confirmCodeId: confirmCodeId!,
      confirmCodeValue: code!,
    }).unwrap();

    if (res) {
      updateModalParams({ confirmCodeValue: code });

      if (type === 'resetConfirmationInfo') {
        openModal('password', {
          ...modalParams,
          ...{
            confirmCodeId,
            confirmCodeValue: code,
          },
        });
      }
      if (type === 'registrationConfirmationInfo') {
        await getUserInfo();
        Notification.add({
          content: t('Auth_Modal_Notification_Registration_Succeeded'),
          duration: 3000,
        });
        sendYmMetric({ // метрика 2.2.14 Успешная регистрация с помощью email. Событие срабатывает после отправки данных на сервер о введеннии правильного кода/пароля.
          event_group: 'event',
          event_category: 'reg',
          event_label: 'registraciya',
          event_name: 'reg-success-registraciya',
          event_action: 'success',
          event_context: 'email',
        });
        handleOnClose();
        callback?.();
      }
      if (type === 'authConfirmationInfo') {
        Notification.add({
          content: t('Auth_Modal_Notification_Auth_Succeeded'),
          duration: 3000,
        });
        handleOnClose();
        callback?.();
      }
    }
  }, [callback, confirm, confirmCodeId, getUserInfo, handleOnClose, modalParams, openModal, t, type, updateModalParams]);

  useEffect(
    () => onReconnect(async () => {
      await confirmRequest(confirmCodeValue);
    }),
    [confirmCodeValue, confirmRequest, onReconnect],
  );

  const declareRecovery = useDeclareRecovery?.({
    service: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
    input: login!,
    language,
  });

  const declareRegistration = useDeclareRegistration?.({
    input: login!,
    language: i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En,
    user: { name: name! },
    service: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
    password: password!,
  });

  const declareHooks = type === 'registrationConfirmationInfo' ? declareRegistration : declareRecovery;

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
  }, [visibilityHandlers, declareHooks, updateModalParams, modalParams, attemptsDeclare]);

  const handleOnSubmit = async (code: string) => {
    updateModalParams({ confirmCodeValue: code });
    visibilityHandlers.handleOnConfirmSubmitStart();
    try {
      await confirmRequest(code);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } catch (error: never) {
      const backendErrors: BackendError[] = error?.data?.errors;
      const errCode = backendErrors[0]?.code;
      const attempts = Number(backendErrors[0]?.message);

      if (backendErrors[0]?.httpStatusCode === 400 && errCode === otpConsts.confirmErrorCodes.expired) {
        updateModalParams({
          ...modalParams,
          confirmError: errCode,
          attemptsConfirm: attempts,
          attemptsDeclare: attempts,
        });
        visibilityHandlers.handleOnDeclareSubmitEnd(attempts, errCode as UseDeclareErrorCode);
      }
      if (backendErrors[0]?.httpStatusCode === 429) {
        const blockedTime = backendErrors[0]?.message;
        openModal('information', {
          type,
          blockedTime,
        });
      }
      if (backendErrors[0]?.httpStatusCode === 403) {
        updateModalParams({
          ...modalParams,
          confirmError: errCode,
          attemptsConfirm: attempts,
          attemptsDeclare: attempts,
        });
        visibilityHandlers.handleOnDeclareSubmitEnd(attempts, errCode as UseDeclareErrorCode);
      }
      if (backendErrors[0]?.httpStatusCode === 500) {
        closeModal();
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
        isPhone={isPhone}
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
            if (type === 'registrationConfirmationInfo') {
              sendYmMetric({ // метрика 2.2.13 Пользователь нажимает на кнопку Назад в шторке регистрации.
                event_group: 'event',
                event_category: 'reg',
                event_label: 'telefon_ili_pochta',
                event_name: 'reg-button_click-telefon_ili_pochta',
                event_action: 'button_click',
                event_context: 'nazad',
                event_element_location: 'popup',
              });
            }
            openModal(backButtonUrls[type] as AuthModalType);
          }
        }}
      />
    </>
  );
});

Otp.displayName = 'Otp';
