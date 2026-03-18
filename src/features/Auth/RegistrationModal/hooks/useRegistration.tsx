// import { useCallback } from 'react';
//
// import { AxiosError } from 'axios';
//
// import { CommonCredentialServiceTypes, declareErrorCodes } from '@/features/Auth/consts';
// import { UseDeclareErrorCode } from '@/features/Auth/types';
// import { getAxiosErrors } from '@/features/Auth/utils';
// import { useRegistration as useRegistrationMutations } from './useRegistrationMutation';

import { RegistrationModalProps } from '../types';

export const useRegistration = (params: {
  isPhone: RegistrationModalProps['isPhone'],
  language: RegistrationModalProps['language'],
  login: RegistrationModalProps['login'],
  onSubmit: RegistrationModalProps['onSubmit'],
}) => {
  // TODO заменить с нашей апишкой
  // const { mutationRegistrationDeclare } = useRegistrationMutations();
  //
  // const handleOnRegistration = useCallback(async (name: string) => {
  //   try {
  //     const registrationDeclareData = await mutationRegistrationDeclare.mutateAsync({
  //       user: {
  //         name,
  //       },
  //       service: params.isPhone
  //         ? CommonCredentialServiceTypes.Phone
  //         : CommonCredentialServiceTypes.Email,
  //       input: params.login,
  //       language: params.language,
  //     });
  //
  //     const confirmCodeId = registrationDeclareData?.data?.confirmCodeId || '';
  //
  //     if (confirmCodeId) {
  //       params.onSubmit({
  //         name,
  //         confirmCodeId,
  //         isTooManyRequestsFor1Min: false,
  //       });
  //     }
  //   } catch (axiosError) {
  //     const errors = getAxiosErrors<UseDeclareErrorCode>(
  //       axiosError as AxiosError,
  //     );
  //     const error = errors[0];
  //
  //     if (error === declareErrorCodes.phoneTooManyRequests1Minute) {
  //       params.onSubmit({
  //         name,
  //         confirmCodeId: '',
  //         isTooManyRequestsFor1Min: true,
  //       });
  //     }
  //   }
  // }, [params, mutationRegistrationDeclare]);
  //
  // return {
  //   isLoading: mutationRegistrationDeclare.isLoading,
  //   handleOnRegistration,
  // };
};
