// import {
//   useMutation,
//   useQueryClient,
// } from '@tanstack/react-query';
// import axios from 'axios';
// import { getCookie } from 'cookies-next';
// import {
//   useAtom,
//   useSetAtom,
// } from 'jotai';
// import getConfig from 'next/config';
// import { authApi } from 'rupor-api';
//
// import { BASIC_AUTH_TOKEN } from '@/constants/auth';
// import { GET_CURRENT_CREDENTIALS } from '@/queries/credentials/keys';
// import { GET_CURRENT_USER_KEY } from '@/queries/users/useCurrentUserQuery';
// import { registrationServiceApi } from '@/restApi';
// import {
//   actionTypeAtom,
//   contactAtom,
//   resetAtom,
// } from '@/stores/betaOnlyStore';
// import { retry } from '@/utils/functions/retry';

export const useRegistration = () => {
  // TODO заменить логику с нашей апишкой
  // const [actionType, setActionType] = useAtom(actionTypeAtom);
  // const [contact, setContact] = useAtom(contactAtom);
  // // const [user, setUser] = useAtom(userAtom);
  // const reset = useSetAtom(resetAtom);
  //
  // const { authToolsUrl } = getConfig().publicRuntimeConfig;
  //
  // const queryClient = useQueryClient();
  //
  // const mutationRegistrationDeclare = useMutation(
  //   (payload: authApi.RegistrationRegistrationDeclareRequest) => (
  //     registrationServiceApi.registrationDeclare(payload)
  //   ),
  //   {
  //     onSuccess: (_, { input }) => {
  //       setContact(input);
  //       setActionType('register');
  //     },
  //     onError: () => {},
  //   },
  // );
  //
  // const mutationRegistrationConfirm = useMutation(
  //   (payload: authApi.RegistrationRegistrationConfirmRequest) => (
  //     registrationServiceApi.registrationConfirm(payload)
  //   ),
  //   {
  //     onSuccess: async () => {
  //       const encodedToken = getCookie(BASIC_AUTH_TOKEN) as string;
  //       const user = atob(encodedToken ?? '')?.split(':')?.[0];
  //
  //       await queryClient.refetchQueries(
  //         [{ name: GET_CURRENT_USER_KEY }, { name: GET_CURRENT_CREDENTIALS }],
  //       );
  //
  //       if (authToolsUrl) {
  //         await retry(
  //           async () => axios.post(
  //             `${authToolsUrl}/api/collections/logs/records?access_token=W5f6pMstoG-VoCqvG2oE7QhWbInMrFEI`,
  //             {
  //               contact,
  //               user,
  //               type: actionType,
  //             },
  //           ),
  //         );
  //       }
  //     },
  //     onError: () => {},
  //     onSettled: () => {
  //       reset();
  //     },
  //   },
  // );
  //
  // return { mutationRegistrationDeclare, mutationRegistrationConfirm };
};
