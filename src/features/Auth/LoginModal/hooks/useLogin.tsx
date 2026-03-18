import { useCallback } from 'react';

import { AxiosError } from 'axios';

import { getIsPhone } from '@/features/Auth/utils';
import { CommonCredentialServiceTypes } from '@/features/Auth/consts';
import { LoginModalProps } from '@/features/Auth/LoginModal/LoginModalRightSide';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line import/extensions
import { useAuth } from '@/mutations/auth/useAuth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line import/extensions
import { useCredential } from '@/mutations/credential/useCredential';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line import/extensions
import { getAxiosErrors } from '@/utils/functions/getAxiosErrors';

import { declareErrorCodes } from '../../OTPModal/consts';
import { UseDeclareErrorCode } from '../../OTPModal/types';

export const useLogin = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line import/extensions
  language: LoginModalProps['language'],
  onSubmit: LoginModalProps['onSubmit'],
) => {
  const { mutationCredentialExists } = useCredential();
  const { mutationAuthDeclare } = useAuth();

  const isLoading = (
    mutationCredentialExists.isLoading
        || mutationAuthDeclare.isLoading
  );

  const handleOnLogin = useCallback(async (login: string): Promise<UseDeclareErrorCode> => {
    const isPhone = getIsPhone(login);

    let isUserAlreadyRegistered = false;
    let isUserBlocked = false;

    try {
      const credentialData = await mutationCredentialExists.mutateAsync({
        value: login,
        service: isPhone
          ? CommonCredentialServiceTypes.Phone
          : CommonCredentialServiceTypes.Email,
      });

      isUserBlocked = !!credentialData.data?.blocked;

      isUserAlreadyRegistered = !!credentialData.data?.exists;
    } catch (axiosError) {
      const errors = getAxiosErrors<UseDeclareErrorCode>(
        axiosError as AxiosError,
      );
      const error = errors[0];

      return error;
    }

    if (!isUserAlreadyRegistered) {
      onSubmit({
        login,
        isPhone,
        isUserAlreadyRegistered: false,
        confirmCodeId: '',
        isAttemptsEnabled: !isUserBlocked,
        isTooManyRequestsFor1Min: false,
      });

      return '';
    }

    try {
      const authDeclareData = await mutationAuthDeclare.mutateAsync({
        service: isPhone
          ? CommonCredentialServiceTypes.Phone
          : CommonCredentialServiceTypes.Email,
        input: login,
        language,
      });

      onSubmit({
        login,
        isPhone,
        isUserAlreadyRegistered: true,
        confirmCodeId: authDeclareData.data.confirmCodeId as string,
        isAttemptsEnabled: !isUserBlocked,
        isTooManyRequestsFor1Min: false,
      });
    } catch (axiosError) {
      const errors = getAxiosErrors<UseDeclareErrorCode>(
        axiosError as AxiosError,
      );
      const error = errors[0];

      if (error === declareErrorCodes.phoneTooManyRequests1Minute) {
        onSubmit({
          login,
          isPhone,
          isUserAlreadyRegistered: true,
          confirmCodeId: '',
          isAttemptsEnabled: true,
          isTooManyRequestsFor1Min: true,
        });
      } else if (
        error === declareErrorCodes.phoneTooManyRequests1Hour
                || error === declareErrorCodes.temporarilyBlocked1Hour
      ) {
        onSubmit({
          login,
          isPhone,
          isUserAlreadyRegistered: true,
          confirmCodeId: '',
          isAttemptsEnabled: false,
          isTooManyRequestsFor1Min: false,
        });
      }
    }

    return '';
  }, [mutationCredentialExists, mutationAuthDeclare, onSubmit, language]);

  return { isLoading, handleOnLogin };
};
