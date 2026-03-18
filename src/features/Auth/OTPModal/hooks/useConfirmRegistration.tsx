// import { useCallback } from 'react';
//
// import { AxiosError } from 'axios';
// import { useAtomValue } from 'jotai';
//
// import { useRegistration } from '@/mutations/registration/useRegistration';
// import { getAxiosErrors } from '@/utils/functions/getAxiosErrors';
// import { useAuthentication } from '@/utils/hooks/useAuthentication';
//
// import { otpModalDataAtom } from '../stores/otpModalStore';
// import {
//   UseConfirm,
//   UseConfirmErrorCode,
// } from '../types';

import { UseConfirm } from '@/features/Auth/OTPModal/types';
// TODO нужна апишка
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useConfirmRegistration: UseConfirm = () => {
  // const { mutationRegistrationConfirm } = useRegistration();
  // const { refreshSession } = useAuthentication();
  //
  // const modalData = useAtomValue(otpModalDataAtom);
  //
  // const load = useCallback(async (code: string) => {
  //   try {
  //     await mutationRegistrationConfirm.mutateAsync({
  //       confirmCodeId: modalData.confirmCodeId,
  //       confirmCodeValue: code,
  //     });
  //
  //     refreshSession();
  //   } catch (axiosError) {
  //     const errors = getAxiosErrors<UseConfirmErrorCode>(
  //       axiosError as AxiosError,
  //     );
  //     const error = errors[0];
  //
  //     return error;
  //   }
  //
  //   return '';
  // }, [modalData, mutationRegistrationConfirm, refreshSession]);
  //
  // return {
  //   load,
  //   isLoading: mutationRegistrationConfirm.isLoading,
  // };
};
