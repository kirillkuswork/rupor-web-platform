import {
  FC, memo, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthModal } from '@/providers/AuthModalProvider';

import { supportEmail } from '@/shareds/constants/paths';
import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';
import { CommonLanguages } from '@/shareds/constants/languages';
import {
  authLocalesEmail,
  authLocalesPhone,
  registrationLocalesEmail,
  registrationLocalesPhone,
} from './hooks/consts';
// import { useConfirmAuth } from './hooks/useConfirmAuth';
// import { useConfirmRegistration } from './hooks/useConfirmRegistration';
// import { useDeclareAuth } from './hooks/useDeclareAuth';
// import { useDeclareRegistration } from './hooks/useDeclareRegistration';
import { useFormatPhoneLogin } from './hooks/useFormatPhoneLogin';
import { OTPModalRightSide } from './OTPModalRightSide';
import { OTPWizardModalSubmitParams } from './types';

export const OTPModal: FC = memo(() => {
  const { t, i18n } = useTranslation();
  const {
    currentModal, modalParams, openModal, closeModal,
  } = useAuthModal();
  const {
    isPhone, login, name, confirmCodeId, type,
  } = modalParams;

  const { format } = useFormatPhoneLogin();
  const isAuth = type === 'authConfirmationInfo';
  const isRegistration = type === 'registrationConfirmationInfo';

  const handleOnSubmit = useCallback(
    (params: OTPWizardModalSubmitParams) => {
      const nextModalType = params.isAttemptsEnabled || isAuth || isRegistration
        ? 'information'
        : null;
      if (nextModalType) {
        const typeNextModal = (() => {
          if (isAuth) return 'authConfirmationInfo';
          if (isRegistration) return 'registrationConfirmationInfo';
          return undefined;
        })();
        openModal(nextModalType, {
          // eslint-disable-next-line no-nested-ternary
          type: typeNextModal,
          ...modalParams,
        });
      }
    },
    [isAuth, isRegistration, modalParams, openModal],
  );

  const handleOnCancel = useCallback(() => {
    if (isAuth) {
      openModal('login', modalParams);
    } else if (isRegistration) {
      openModal('registration', modalParams);
    }
  }, [isAuth, isRegistration, modalParams, openModal]);

  const handleOnClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const locale = useMemo(() => {
    if (isAuth) {
      return isPhone ? authLocalesPhone : authLocalesEmail;
    }
    return isPhone ? registrationLocalesPhone : registrationLocalesEmail;
  }, [isAuth, isPhone]);

  if (currentModal !== 'otp') {
    return null;
  }

  return (
    <OTPModalRightSide
      login={login!}
      isPhone={isPhone!}
      name={name!}
      confirmCodeId={confirmCodeId!}
      language={
        i18n.language === 'ru'
          ? CommonLanguages.Ru
          : CommonLanguages.En
      }
      title={t(locale.title)}
      description={t(locale.description, {
        login: isPhone ? format(login!) : login,
      })}
      informationText={formatInformationText(
        t(locale.informationText, {
          email: supportEmail,
        }),
      )}
      onSubmit={handleOnSubmit}
      onCancel={handleOnCancel}
      onClose={handleOnClose}
      // useDeclare={isAuth ? useDeclareAuth : useDeclareRegistration}
      // useConfirm={isAuth ? useConfirmAuth : useConfirmRegistration}
    />
  );
});

OTPModal.displayName = 'OTPModal';
