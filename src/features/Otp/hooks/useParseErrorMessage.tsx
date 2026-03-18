import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { ruDeclination } from '@/shareds/lib/utils/ruDeclination';
import { otpConsts } from '../consts';
import { UseConfirmErrorCode } from '../types';

export const useParseErrorMessage = (attemptsConfirm: number) => {
  const { t } = useTranslation();

  const parseConfirmError = useCallback((errorMessage: UseConfirmErrorCode) => {
    if (errorMessage === otpConsts.confirmErrorCodes.invalid) {
      const attempts = `${ruDeclination(attemptsConfirm, [t('Parse_Error_Message_Attempt_1'), t('Parse_Error_Message_Attempt_2')])} ${attemptsConfirm} ${ruDeclination(attemptsConfirm, [t('Parse_Error_Message_Attempt_Confirm_1'), t('Parse_Error_Message_Attempt_Confirm_2')])}`;
      return t('Modal_OTP_Error_Invalid_Code', { attempts });
    }

    if (errorMessage === otpConsts.confirmErrorCodes.manyAttempts) {
      return t('Modal_OTP_Error_Expired_Code');
    }

    if (errorMessage === otpConsts.confirmErrorCodes.expired) {
      return t('Modal_OTP_Error_Expired_Code');
    }

    return '';
  }, [t, attemptsConfirm]);

  return { parseConfirmError };
};
