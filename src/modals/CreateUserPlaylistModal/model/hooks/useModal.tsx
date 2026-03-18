import { useCallback } from 'react';

import { useCreateNewPlaylistMutation } from '@/redux/services/playlist';
import { Notification } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { useCreateUserPlaylistModal } from './useCreateUserPlaylistModalContext';
import { useCreatePlaylistNotification } from './useCreatePlaylistNotification';

export const useModal = () => {
  const {
    isModalOpen, openModal, closeModal, modalState,
  } = useCreateUserPlaylistModal();
  const { t } = useTranslation();
  const [createPlaylist, { isLoading }] = useCreateNewPlaylistMutation();
  const { showNotification: onCreateNotification } = useCreatePlaylistNotification();

  const handleSubmitCreatePlaylist = useCallback(({ title, description }: { title: string, description?: string }) => {
    createPlaylist({ title, description }).then((res) => {
      if (!res?.error) {
        closeModal();
        onCreateNotification(title);
        modalState?.onFinish?.(res.data.playlistId, title);
      }
      if (res.error) {
        Notification.add({
          content: t('Use_Modal_Notification_Error'),
          duration: 1500,
        });
      }
    });
  }, [closeModal, createPlaylist, modalState]);

  return {
    openModal,
    closeModal,
    handleSubmitCreatePlaylist,
    isModalOpen,
    isLoading,
  };
};
