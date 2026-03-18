import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import { Button } from 'rupor-ui-kit';
import { useSendYmMetrics, useAuthModal } from 'rupor-common';

const WithAuthContentHeader = function WithAuthContentHeader() {
  const { t } = useTranslation();
  const isMobile = false;
  const { openModal } = useAuthModal();
  const { sendYmMetric } = useSendYmMetrics();

  const handelOnClick = useCallback(() => {
    sendYmMetric({ // метрика 2.2.3 Пользователь нажимает на кнопку Войти в хэдере
      event_group: 'event',
      event_category: 'auth',
      event_label: 'voiti',
      event_name: 'auth-button_click-voiti',
      event_action: 'button_click',
      event_element_location: 'header',
    });
    openModal('login');
  }, [openModal]);

  return (
    <Button
      data-testid="not-auth-login-button"
      onClick={handelOnClick}
      size={isMobile ? 'extra small' : 'small'}
    >
      {t('Common_enter')}
    </Button>
  );
};

export default WithAuthContentHeader;
