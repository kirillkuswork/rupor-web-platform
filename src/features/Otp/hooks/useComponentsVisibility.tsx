import {
  useCallback,
  useState,
} from 'react';

import { UseDeclareErrorCode } from '@/modals/AuthModal/Content/Otp/types';
import {
  otpConsts,
} from '../consts';
import {
  UseConfirmErrorCode,
} from '../types';

type OTPComponentsVisibility = {
  isOTPInputVisible: boolean;
  isCountdownTimerVisible: boolean;
  isSpinnerVisible: boolean;
  isInformationTextVisible: boolean;
  isRetryCodeButtonVisible: boolean;
  isBackButtonVisible: boolean;
};

export const useComponentsVisibility = () => {
  const [visibility, setVisibility] = useState<OTPComponentsVisibility>({
    isOTPInputVisible: true,
    isCountdownTimerVisible: true,
    isSpinnerVisible: false,
    isInformationTextVisible: false,
    isRetryCodeButtonVisible: false,
    isBackButtonVisible: true,
  });

  const handleOnCountdownTimerStart = useCallback(() => {
    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      isCountdownTimerVisible: true,
      isRetryCodeButtonVisible: false,
    }));
  }, []);

  const handleOnCountdownTimerEnd = useCallback(() => {
    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      isCountdownTimerVisible: false,
      isRetryCodeButtonVisible: true,
    }));
  }, []);

  const handleOnDeclareSubmitStart = useCallback(() => {
    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      isOTPInputVisible: false,
      isBackButtonVisible: false,
    }));
  }, []);

  const handleOnDeclareSubmitEnd = useCallback((
    attemptsDeclare: number,
    error?: UseDeclareErrorCode,
  ) => {
    const isAttemptsEnabled = attemptsDeclare !== 0;

    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      isOTPInputVisible: true,
      isCountdownTimerVisible: true,
      ...(
        error === otpConsts.declareErrorCodes.phoneTooManyRequests1Hour
                || !isAttemptsEnabled
      ) && {
        isInformationTextVisible: true,
        isCountdownTimerVisible: false,
      },
      isRetryCodeButtonVisible: false,
      isBackButtonVisible: true,
      isSpinnerVisible: false,
    }));
  }, []);

  const handleOnConfirmSubmitStart = useCallback(() => {
    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      isSpinnerVisible: true,
    }));
  }, []);

  const handleOnConfirmSubmitEnd = useCallback((error?: UseConfirmErrorCode) => {
    setVisibility((currentVisibility) => ({
      ...currentVisibility,
      isSpinnerVisible: false,
      ...error === otpConsts.confirmErrorCodes.manyAttempts && {
        isCountdownTimerVisible: false,
        isRetryCodeButtonVisible: true,
      },
    }));
  }, []);

  return {
    visibility,
    handleOnCountdownTimerStart,
    handleOnCountdownTimerEnd,
    handleOnDeclareSubmitStart,
    handleOnDeclareSubmitEnd,
    handleOnConfirmSubmitStart,
    handleOnConfirmSubmitEnd,
  };
};
