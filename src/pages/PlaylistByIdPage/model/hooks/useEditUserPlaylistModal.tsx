import {
  useCallback,
} from 'react';

import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { playlistActions } from '@/redux/actions/playlistActions';
import { Notification } from 'rupor-ui-kit';
import { useEditMyPlaylistByIdMutation } from '@/redux/services/playlist';
import { useTranslation } from 'next-i18next';
import { useEditedPlaylistNotification } from './useEditedPlaylistNotification';

interface IProps {
  playlistId: string;
  playlistTitle: string;
}

export const useEditUserPlaylistModal = ({ playlistId, playlistTitle = '' }: IProps) => {
  const { isEditPlaylistModalOpen } = useSelector(selectors.playlistSelector);
  const { showNotification: onEditNotification } = useEditedPlaylistNotification();
  const { t } = useTranslation();
  const { setIsEditPlaylistModalOpen, setEditedPlaylistName } = useActions(playlistActions);

  const [editPlaylist, { isLoading }] = useEditMyPlaylistByIdMutation();

  const handleOpenEditPlaylistModal = useCallback(() => setIsEditPlaylistModalOpen(true), [setIsEditPlaylistModalOpen]);
  const handleCloseEditPlaylistModal = useCallback(() => setIsEditPlaylistModalOpen(false), [setIsEditPlaylistModalOpen]);

  const handleSubmitEditPlaylist = useCallback(({ title, description }: { title: string, description?: string }) => {
    editPlaylist({ title, description, playlistId }).then((res) => {
      if (!res?.error) {
        setIsEditPlaylistModalOpen(false);
        setEditedPlaylistName(title);
        onEditNotification(title);
      }

      if (res.error) {
        Notification.add({
          content: t('Edit_User_Playlist_Modal_Notification_Error'),
          duration: 1500,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPlaylist, playlistId]);

  return {
    handleOpenEditPlaylistModal,
    handleCloseEditPlaylistModal,
    handleSubmitEditPlaylist,
    isEditPlaylistModalOpen,
    isLoading,
  };
};
