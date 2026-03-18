import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { formatInformationText } from '@/shareds/lib/utils/formatInformationText';
import { ModalParams, useAuthModal } from '@/providers/AuthModalProvider';
import {
  USER_NAME_AVAILABLE_SYMBOLS_INFO,
} from '@/features/Auth/consts';
import { CommonLanguages } from '@/shareds/constants/languages';
import { RegistrationModalRightSide } from './RegistrationModalRightSide';

export const RegistrationModal: FC = memo(() => {
  const { t, i18n } = useTranslation();
  const {
    currentModal, modalParams, openModal, closeModal,
  } = useAuthModal();

  const {
    login, name, isPhone, isTooManyRequestsFor1Min, confirmCodeId,
  } = modalParams;

  const handleOnSubmit = useCallback(
    (params: ModalParams) => {
      const nextModalType = isPhone && isTooManyRequestsFor1Min ? 'information' : 'otp';
      openModal(nextModalType, {
        type: isTooManyRequestsFor1Min ? 'oneMinConfirmationInfo' : undefined,
        ...modalParams,
        ...params,
      });
    },
    [isPhone, isTooManyRequestsFor1Min, modalParams, openModal],
  );

  const handleOnCancel = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleOnClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  if (currentModal !== 'registration') {
    return null;
  }

  return (
    <RegistrationModalRightSide
      confirmCodeId={confirmCodeId!}
      title={t('Modal_Registration_Title')}
      description={t('Modal_Registration_Description')}
      language={
        i18n.language === 'ru' ? CommonLanguages.Ru : CommonLanguages.En
      }
      submitButtonTitle={t('Modal_Registration_Submit_Button_Title')}
      cancelButtonTitle={t('Modal_Registration_Cancel_Button_Title')}
      inputLabel={t('Modal_Registration_Input_Label')}
      consentText={formatInformationText(
        t('Modal_Registration_Consent', {
          linkUrl: '#',
        }),
      )}
      rulesTitle={t('Modal_Registration_Name_Rules_Title')}
      rules={[
        t('Modal_Registration_Name_Rules_Item_1'),
        t('Modal_Registration_Name_Rules_Item_2'),
        t('Modal_Registration_Name_Rules_Item_3', {
          symbolsSequence: USER_NAME_AVAILABLE_SYMBOLS_INFO,
        }),
      ]}
      login={login!}
      name={name!}
      onSubmit={handleOnSubmit}
      onCancel={handleOnCancel}
      onClose={handleOnClose}
      isPhone={isPhone!}
    />
  );
});

RegistrationModal.displayName = 'RegistrationModal';
