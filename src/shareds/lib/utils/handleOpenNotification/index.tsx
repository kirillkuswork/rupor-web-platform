import { Notification } from 'rupor-ui-kit';
import { t } from 'i18next';

export const handleOpenNotification = () => {
  Notification.add({
    content: t('Open_Notification_Copy'),
    duration: 1000,
  });
};
