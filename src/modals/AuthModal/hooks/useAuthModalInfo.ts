import { AuthModalType, useAuthModal } from '@/providers/AuthModalProvider';
import { useTranslation } from 'next-i18next';

type AuthModalInfoType = {
  title: string;
  description?: string;
  titleDti?: string;
  descriptionDti?: string;
};

export const useAuthModalInfo = () => {
  const { t } = useTranslation();
  const { modalParams } = useAuthModal();
  const { login } = modalParams;

  const modalInfo: Record<Exclude<AuthModalType, null>, AuthModalInfoType> = {
    login: { title: t('Auth_Modal_Login_Title'), titleDti: 'auth-modal-login-title' },
    registration: {
      title: t('Modal_Registration_Title'),
      titleDti: 'auth-modal-registration-title',
    },
    otp: {
      title: t('Modal_OTP_Title_Email'),
      description: t('Modal_OTP_Description_Email', {
        login,
      }),
      titleDti: 'auth-modal-otp-title',
      descriptionDti: 'otp-email-description',
    },
    information: {
      title: t('Modal_Information_Confirm_Title_Email'),
      titleDti: 'auth-modal-information-title',
    },
    recovery: {
      title: t('Auth_Modal_Recovery_Title'),
      titleDti: 'auth-modal-recovery-title',
    },
    password: {
      title: t('Auth_Modal_Reset_Title'),
      titleDti: 'auth-modal-password-title',
    },
  };

  return { modalInfo };
};
