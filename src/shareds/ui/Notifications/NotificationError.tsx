import { getRequestKey } from '@/shareds/lib/utils/getRequestKey';
import { saveInBuffer } from '@/shareds/lib/utils/saveInBuffer';
import type { AxiosError } from 'axios';
import {
  Notification,
  Button,
} from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

const NotificationError = <T, D>({ response, config, message }: AxiosError<T, D>) => {
  const key = getRequestKey(config!);
  const { t } = useTranslation();
  const close = () => {
    Notification.close(key);
  };
  const handleCopyAndClose = () => {
    saveInBuffer(t('Notification_Error_Save_In_Buffer'), JSON.stringify(response));
    close();
  };

  return (
    <>
      <div className="text-center">
        {`${t('Notification_Error_Server_Error', { server: String(response?.status).startsWith('5') ? t('Notification_Error_Server_Error_Text') : '' })} (${response?.status})`}
      </div>
      <div>{key}</div>
      <div>{message}</div>
      <div className="flex justify-center mt-5">
        <Button
          size="small"
          variant="secondary"
          label={t('Notification_Error_Button_Label')}
          onClick={handleCopyAndClose}
        />
      </div>
    </>
  );
};

export default NotificationError;
