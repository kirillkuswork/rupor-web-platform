import {
  useCallback,
} from 'react';
import { Button, Notification } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { useAuthModal } from 'rupor-common';

export const useAuthWarning = () => {
  const { t } = useTranslation();
  const { openModal } = useAuthModal();
  const handelOnClick = useCallback(() => {
    openModal('login');
  }, [openModal]);

  const openAuthWarning = useCallback((warningText: string, dti: string = '') => {
    const key = 'AUTH_WARNING_NOTIFICATION';

    Notification.add({
      containerClassName: 'dark:!bg-white',
      key,
      content: (
        <div className="flex items-center justify-center">
          <div data-testid={`${dti}-notification-text`} className="pr-6 text-black text-paragraph-l-m">
            {warningText}
          </div>
          <Button
            data-testid={`${dti}-notification-login-button`}
            onClick={() => handelOnClick()}
            className="shrink-0"
          >
            {t('Common_enter')}
          </Button>
        </div>
      ),
      duration: 1500,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handelOnClick]);

  return { openAuthWarning };
};
