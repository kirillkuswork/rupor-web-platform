// import { useCallback } from 'react';
//
// import { AxiosError } from 'axios';
// import { authApi } from 'rupor-api';
//
// import { useAuthModal } from '@/providers/AuthModalProvider';
// import { useAuth } from '@/mutations/auth/useAuth';
// import { getAxiosErrors } from '@/utils/functions/getAxiosErrors';
//
// import {
//   UseDeclare,
//   UseDeclareErrorCode,
// } from '../types';

import { UseDeclare } from '@/features/Auth/OTPModal/types';
// TODO нужна апишка
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useDeclareAuth: UseDeclare = ({
  // isPhone,
  // login,
  // language,
}) => {
  // const { mutationAuthDeclare } = useAuth();
  //
  // const { updateModalParams, modalParams } = useAuthModal();
  //
  // const load = useCallback(async () => {
  //   try {
  //     const declareData = await mutationAuthDeclare.mutateAsync({
  //       service: isPhone
  //         ? authApi.CommonCredentialServiceType.Phone
  //         : authApi.CommonCredentialServiceType.Email,
  //       input: login,
  //       language,
  //     });
  //
  //     const confirmCodeId = declareData.data.confirmCodeId as string;
  //     const attemptsConfirm = declareData.data.attempts as number;
  //
  //     if (confirmCodeId) {
  //       updateModalParams({
  //         ...modalParams,
  //         confirmError: '',
  //         attemptsDeclare: modalParams.attemptsDeclare! - 1,
  //         confirmCodeId,
  //         attemptsConfirm,
  //       });
  //     }
  //   } catch (axiosError) {
  //     const errors = getAxiosErrors<UseDeclareErrorCode>(
  //       axiosError as AxiosError,
  //     );
  //     const error = errors[0];
  //
  //     updateModalParams({
  //       ...modalParams,
  //       declareError: error,
  //     });
  //
  //     return error;
  //   }
  //
  //   return '';
  // }, [
  //   isPhone,
  //   login,
  //   language,
  //   mutationAuthDeclare,
  //   updateModalParams,
  // ]);
  //
  // return {
  //   load,
  //   isLoading: mutationAuthDeclare.isLoading,
  // };
};
