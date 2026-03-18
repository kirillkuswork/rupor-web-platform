import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthModal } from '@/providers/AuthModalProvider';
import { supportEmail } from '@/shareds/constants/paths';
import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';
import { InformationModalRightSide } from './InformationModalRightSide';
import {
  ATTEMPTS_COUNT, authLocalesEmail, authLocalesPhone, registrationLocalesEmail, registrationLocalesPhone,
} from '../consts';

export const InformationModal: FC = memo(() => {
  const { t } = useTranslation();
  const {
    currentModal, modalParams, closeModal, openModal,
  } = useAuthModal();

  const { isPhone, isUserAlreadyRegistered, type } = modalParams;

  const handleOnSubmit = useCallback(() => {
    if (type === 'authConfirmationInfo' || type === 'registrationConfirmationInfo') {
      openModal('login');
    } else if (type === 'oneMinConfirmationInfo') {
      closeModal();
    }
  }, [type, openModal, closeModal]);

  const handleOnClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  let locale;

  if (currentModal !== 'information') return null;

  if (type === 'authConfirmationInfo') {
    locale = isPhone ? authLocalesPhone : authLocalesEmail;

    return (
      <InformationModalRightSide
        title={t(locale.title)}
        description={t(locale.description, {
          attempts: ATTEMPTS_COUNT,
        })}
        info={formatInformationText(
          t(locale.info, {
            supportEmail,
          }),
        )}
        submitBtnTitle={t(locale.submitBtnTitle)}
        onSubmit={handleOnSubmit}
        onClose={handleOnClose}
      />
    );
  }

  if (type === 'registrationConfirmationInfo') {
    locale = isPhone ? registrationLocalesPhone : registrationLocalesEmail;

    return (
      <InformationModalRightSide
        title={t(locale.title)}
        description={t(locale.description, {
          attempts: ATTEMPTS_COUNT,
        })}
        info={formatInformationText(
          t(locale.info, {
            supportEmail,
          }),
        )}
        submitBtnTitle={t(locale.submitBtnTitle)}
        onSubmit={handleOnSubmit}
        onClose={handleOnClose}
      />
    );
  }

  if (type === 'oneMinConfirmationInfo') {
    return (
      <InformationModalRightSide
        title={t('Modal_Information_Confirm_Title_1_Min')}
        description={t('Modal_Information_Confirm_Description_1_Min')}
        info={formatInformationText(
          t('Modal_Information_Confirm_Description2_1_Min', {
            supportEmail,
          }),
        )}
        submitBtnTitle={
          isUserAlreadyRegistered
            ? t('Modal_Information_Confirm_SubmitBtn_Auth_1_Min')
            : t('Modal_Information_Confirm_SubmitBtn_Reg_1_Min')
        }
        onSubmit={handleOnSubmit}
        onClose={handleOnClose}
      />
    );
  }

  return null;
});

InformationModal.displayName = 'InformationModal';
