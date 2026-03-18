import NotificationSaveInBuffer from '@/shareds/ui/Notifications/NotificationSaveInBuffer';
import { Notification } from 'rupor-ui-kit';

export const saveInBuffer = async (titleMessage: string, data: string) => {
  try {
    await navigator.clipboard.writeText(data);
    Notification.add({
      content: <NotificationSaveInBuffer titleMessage={titleMessage} />,
    });
  } catch (err) {
    // console.log('Something went wrong', err);
  }
};
