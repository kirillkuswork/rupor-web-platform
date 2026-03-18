import { NotificationPlaylistActions } from '@/shareds/ui/Notifications/NotificationPlaylistActions';
import { WRAPPER_COMPONENT_CLASSNAME } from '@/shareds/ui/Notifications/NotificationPlaylistActions/constants';
import { Notification } from 'rupor-ui-kit/dist';
import { useTranslation } from 'next-i18next';

const NOTIFICATION_DURATION_IN_MILLISECONDS = 5000;
const CREATED_PLAYLIST_MODAL_NOTIFICATION_KEY = 'CREATED_PLAYLIST_MODAL_NOTIFICATION_KEY';

export const useCreatePlaylistNotification = () => {
  const { t } = useTranslation();

  const showNotification = (title: string) => {
    Notification.add({
      containerClassName: WRAPPER_COMPONENT_CLASSNAME,
      content: (
        <NotificationPlaylistActions
          message={t('Create_Playlist_Notification_Success', { title })}
          handleOnClose={() => {
            Notification.close(CREATED_PLAYLIST_MODAL_NOTIFICATION_KEY);
          }}
        />
      ),
      key: CREATED_PLAYLIST_MODAL_NOTIFICATION_KEY,
      duration: NOTIFICATION_DURATION_IN_MILLISECONDS,
    });
  };

  return { showNotification };
};
