import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AuthModalType,
  ModalParams,
  useAuthModal,
} from '@/providers/AuthModalProvider';
import { LoginModalRightSide } from './LoginModalRightSide';

export const LoginModal: FC = memo(() => {
  const { t } = useTranslation();
  const {
    currentModal, modalParams, openModal, closeModal,
  } = useAuthModal();

  const handleOnSubmit = useCallback(
    (params: ModalParams) => {
      let nextModalType: AuthModalType;
      if (params.isAttemptsEnabled) {
        if (params.isPhone) {
          if (params.isUserAlreadyRegistered) {
            nextModalType = params.isTooManyRequestsFor1Min
              ? 'information'
              : 'otp';
          } else {
            nextModalType = 'registration';
          }
        } else {
          nextModalType = params.isUserAlreadyRegistered
            ? 'otp'
            : 'registration';
        }
      } else {
        nextModalType = params.isUserAlreadyRegistered
          ? 'information'
          : 'information';
      }

      if (nextModalType) {
        openModal(nextModalType, {
          // eslint-disable-next-line no-nested-ternary
          type: params.isTooManyRequestsFor1Min
            ? 'oneMinConfirmationInfo'
            : params.isUserAlreadyRegistered
              ? 'authConfirmationInfo'
              : 'registrationConfirmationInfo',
          ...{ modalParams, confirmCodeId: params.confirmCodeId },
          login: params.login,
        });
      }
    },
    [openModal, modalParams],
  );

  const handleOnClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  if (currentModal !== 'login') {
    return null;
  }

  return (
    <LoginModalRightSide
      title={t('Modal_Login_Title')}
      description={t('Modal_Login_Description')}
      submitButtonTitle={t('Modal_Login_Submit_Button_Title')}
      inputLabel={t('Modal_Login_Input_Label')}
      onSubmit={handleOnSubmit}
      onClose={handleOnClose}
    />
  );
});

LoginModal.displayName = 'LoginModal';
