// import { useCallback } from 'react';
//
// import { AxiosError } from 'axios';
// import { useSetAtom } from 'jotai';
// import { authApi } from 'rupor-api';
//
// import { useRegistration } from '@/mutations/registration/useRegistration';
// import { getAxiosErrors } from '@/utils/functions/getAxiosErrors';
//
// import { otpModalDataAtom } from '../stores/otpModalStore';
// import {
//   UseDeclare,
//   UseDeclareErrorCode,
// } from '../types';

import { UseDeclare } from '@/features/Auth/OTPModal/types';
// TODO нужна апишка
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useDeclareRegistration: UseDeclare = ({
  // isPhone,
  // login,
  // language,
  // name,
}) => {
  // const { mutationRegistrationDeclare } = useRegistration();
  //
  // const setModalData = useSetAtom(otpModalDataAtom);
  //
  // const load = useCallback(async () => {
  //   try {
  //     const declareData = await mutationRegistrationDeclare.mutateAsync({
  //       user: {
  //         name,
  //       },
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
  //       setModalData((currentModalData) => ({
  //         ...currentModalData,
  //         confirmError: '',
  //         attemptsDeclare: currentModalData.attemptsDeclare - 1,
  //         confirmCodeId,
  //         attemptsConfirm,
  //       }));
  //     }
  //   } catch (axiosError) {
  //     const errors = getAxiosErrors<UseDeclareErrorCode>(
  //       axiosError as AxiosError,
  //     );
  //     const error = errors[0];
  //
  //     return error;
  //   }
  //
  //   return '';
  // }, [
  //   isPhone,
  //   login,
  //   language,
  //   name,
  //   mutationRegistrationDeclare,
  //   setModalData,
  // ]);
  //
  // return {
  //   load,
  //   isLoading: mutationRegistrationDeclare.isLoading,
  // };
};
