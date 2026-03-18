import {
  useCallback,
} from 'react';

import { useRouter } from 'next/router';

import { useDeleteMyPlaylistByIdMutation } from '@/redux/services/playlist';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { playlistActions } from '@/redux/actions/playlistActions';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { Notification } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { useDeletedPlaylistNotification } from './useDeletedPlaylistNotification';

interface IProps {
  playlistId: string;
  playlistTitle: string;
}

export const useDeleteUserPlaylistModal = ({ playlistId, playlistTitle = '' }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isDeletePlaylistModalOpen } = useSelector(selectors.playlistSelector);
  const { setIsDeletePlaylistModalOpen } = useActions(playlistActions);

  const [deletePlaylist, { isLoading }] = useDeleteMyPlaylistByIdMutation();
  const { showNotification: onDeleteNotification } = useDeletedPlaylistNotification();

  const handleOpenDeletePlaylistModal = useCallback(() => setIsDeletePlaylistModalOpen(true), [setIsDeletePlaylistModalOpen]);
  const handleCloseDeletePlaylistModal = useCallback(() => setIsDeletePlaylistModalOpen(false), [setIsDeletePlaylistModalOpen]);

  const handleSubmitDeletePlaylist = useCallback(() => {
    deletePlaylist({ playlistId }).then((res) => {
      if (!res?.error) {
        handleCloseDeletePlaylistModal();
        onDeleteNotification(playlistTitle);
        router.replace(APP_PATHS_PAGES.saved);
      }
      if (res.error) {
        Notification.add({
          content: t('Delete_User_Playlist_Modal_Notification_Error'),
          duration: 1500,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletePlaylist, handleCloseDeletePlaylistModal, playlistId]);

  return {
    handleOpenDeletePlaylistModal,
    handleCloseDeletePlaylistModal,
    handleSubmitDeletePlaylist,
    isDeletePlaylistModalOpen,
    isLoading,
  };
};
