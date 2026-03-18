import { NotificationPlaylistActions } from '@/shareds/ui/Notifications/NotificationPlaylistActions';
import { WRAPPER_COMPONENT_CLASSNAME } from '@/shareds/ui/Notifications/NotificationPlaylistActions/constants';
import { Notification } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

const NOTIFICATION_DURATION_IN_MILLISECONDS = 5000;
const EDITED_PLAYLIST_MODAL_NOTIFICATION_KEY = 'EDITED_PLAYLIST_MODAL_NOTIFICATION_KEY';

export const useEditedPlaylistNotification = () => {
  const { t } = useTranslation();

  const showNotification = (title: string, id?: string) => {
    Notification.add({
      containerClassName: WRAPPER_COMPONENT_CLASSNAME,
      content: (
        <NotificationPlaylistActions
          id={id}
          message={t('Edited_Playlist_Notification_Success', { title })}
          handleOnClose={() => {
            Notification.close(EDITED_PLAYLIST_MODAL_NOTIFICATION_KEY);
          }}
        />
      ),
      key: EDITED_PLAYLIST_MODAL_NOTIFICATION_KEY,
      duration: NOTIFICATION_DURATION_IN_MILLISECONDS,
    });
  };

  return { showNotification };
};
