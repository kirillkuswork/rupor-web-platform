/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC, memo, useCallback, useEffect,
} from 'react';

import { useAuthModal } from '@/providers/AuthModalProvider';
import { Header, Wrapper } from '@/features/Auth/ui';
import { authApi } from '@/redux/services';
import { useRefreshDataAfterLogout } from '@/shareds/hooks/useRefreshDataAfterLogout';
import { BackButton } from './components/BackButton';
import { CountdownTimer } from './components/CountdownTimer';
import { InformationText } from './components/InformationText';
import { OTPInputField } from './components/OTPInputField';
import { OTPInputFieldSkeleton } from './components/OTPInputField/OTPInputFieldSkeleton';
import { RetryCodeButton } from './components/RetryCodeButton';
import { Spinner } from './components/Spinner';
import { OTP_INPUT_LENGTH } from './consts';
// confirmErrorCodes,
import { useComponentsVisibility } from './hooks/useComponentsVisibility';
import { useParseErrorMessage } from './hooks/useParseErrorMessage';
import { OTPModalProps, UseConfirmErrorCode } from './types';

export const OTPModalRightSide: FC<OTPModalProps> = memo(
  ({
    title,
    description,
    informationText,
    isPhone,
    login,
    language,
    name,
    confirmCodeId,
    // onSubmit,
    onCancel: handleOnCancel,
    onClose: handleOnClose,
    useDeclare,
    useConfirm,
  }) => {
    const { modalParams, updateModalParams } = useAuthModal();
    const [confirm] = authApi.useLazyConfirmQuery();
    const callback = useRefreshDataAfterLogout();
    useEffect(() => {
      updateModalParams({
        ...modalParams,
        confirmCodeId,
      });

      return () => {
        updateModalParams({ ...modalParams });
      };
    }, []);

    const {
      attemptsConfirm, attemptsDeclare, confirmError, confirmCodeId: confirmCodeID,
    } = modalParams;

    const declareHook = useDeclare?.({
      isPhone,
      login,
      language,
      name,
    });
    const confirmHook = useConfirm?.();

    const { visibility, ...visibilityHandlers } = useComponentsVisibility();

    const { parseConfirmError } = useParseErrorMessage(attemptsConfirm!);

    const handleOnRetry = useCallback(() => {
      visibilityHandlers.handleOnDeclareSubmitStart();
      // declareHook.load().then((error) => {
      //   if (error) {
      //     updateModalParams({
      //       ...modalParams,
      //       declareError: error,
      //     });

      //     visibilityHandlers.handleOnDeclareSubmitEnd(attemptsDeclare!, error);
      //   } else {
      //     visibilityHandlers.handleOnDeclareSubmitEnd(attemptsDeclare! - 1);
      //   }
      // });
    }, [declareHook, visibilityHandlers, attemptsDeclare, updateModalParams]);

    const handleOnSubmit = useCallback(
      async (code: string) => {
        visibilityHandlers.handleOnConfirmSubmitStart();
        try {
          const data = await confirm({
            confirmCodeId: confirmCodeID!,
            confirmCodeValue: code,
            authType: modalParams.type!,
          });
          if (!data.isError) {
            callback?.();
            handleOnClose();
          }

          if (data.isError) {
            const attempts = attemptsDeclare! - 1;
            const error = (data.error as Record<string, any>).data.errors[0].code;
            updateModalParams({
              ...modalParams,
              confirmError: error,
              attemptsConfirm: attempts,
              attemptsDeclare: attempts,
            });
            visibilityHandlers.handleOnDeclareSubmitEnd(attempts, error);
          }
        } catch (e) {
          console.log(e);
        }
      },
      [visibilityHandlers, confirm, confirmCodeId, attemptsDeclare],
    );

    const isSubmit = declareHook?.isLoading || confirmHook?.isLoading;

    return (
      <Wrapper onClose={handleOnClose} ariaLabelledby={title}>
        <Header
          titleDti={isPhone ? 'otp-phone' : 'otp-email'}
          descriptionDti={
            isPhone ? 'otp-phone-description' : 'otp-email-description'
          }
          title={title}
          description={description}
        >
          {visibility.isOTPInputVisible ? (
            <OTPInputField
              length={OTP_INPUT_LENGTH}
              isSubmit={isSubmit!}
              errorMsg={parseConfirmError(confirmError as UseConfirmErrorCode)}
              onFullFilled={handleOnSubmit}
            />
          ) : (
            // скелетоны для сбрасывания внутреннего состояния основного инпута выше
            // за счет его re-render'a
            // это нужно например после нажатия на кнопку "RetryCodeButton"
            <OTPInputFieldSkeleton length={OTP_INPUT_LENGTH} />
          )}

          <CountdownTimer
            isPhone={isPhone}
            isVisible={visibility.isCountdownTimerVisible}
            onStart={visibilityHandlers.handleOnCountdownTimerStart}
            onEnd={visibilityHandlers.handleOnCountdownTimerEnd}
          />

          <Spinner isVisible={visibility.isSpinnerVisible} />

          <InformationText
            isVisible={visibility.isInformationTextVisible}
            text={informationText}
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
            onClick={handleOnCancel}
          />
        </Header>
      </Wrapper>
    );
  },
);

OTPModalRightSide.displayName = 'OTPModalRightSide';
