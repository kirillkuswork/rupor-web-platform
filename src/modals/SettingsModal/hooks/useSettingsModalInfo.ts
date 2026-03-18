import { useTranslation } from 'next-i18next';
import {
  SettingsModalType,
  useSettingsModal,
} from '@/app/providers/SettingsProvider';

type SettingsModalInfoType = {
  title: string;
  description?: string;
  titleDti?: string;
  descriptionDti?: string;
};

export const useSettingsModalInfo = () => {
  const { t } = useTranslation();
  const { modalParams } = useSettingsModal();
  const { login } = modalParams;

  const modalInfo: Record<
  Exclude<SettingsModalType, null>,
  SettingsModalInfoType
  > = {
    email: {
      title: t('Setting_Form_Static_Text_Field_Email_Label_In_Modal'),
      titleDti: 'change-email-modal-title',
    },
    password: {
      title: t('Settings_Modal_Change_Password_Title'),
      titleDti: 'change-password-modal-title',
    },
    otp: {
      title: t('Modal_OTP_Title_Email'),
      description: t('Modal_OTP_Description_Email', {
        login,
      }),
      titleDti: 'auth-modal-password-title',
      descriptionDti: 'otp-email-description',
    },
    information: {
      title: t('Modal_Information_Confirm_Title_Email'),
      titleDti: 'change-modal-information-title',
    },
    avatar: {
      title: t('Avatar_Field_View_Photo'),
      titleDti: 'change-avatar-modal-title',
      description: t('Settings_Upload_Image_Modal_Description'),
      descriptionDti: 'change-avatar-modal-description',
    },
  };

  return { modalInfo };
};
