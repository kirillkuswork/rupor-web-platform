import { IGetActions, TVideoAction } from '@/entities/Video';
import { useTranslation } from 'next-i18next';
import { SaveDisketteIcon, TrashIcon } from 'rupor-ui-kit';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import {
  useLazyAddVideoToPersonalPlaylistQuery,
  useLazyDeleteVideoFromPersonalPlaylistQuery,
} from '@/redux/services/playlist';
import { useChooseUserPlaylistModal } from '@/modals/ChoosePlaylistModal';
import { useAuthWarning } from '@/shareds/hooks/useAuthWarning';
import { useActions } from '@/shareds/hooks/useActions';
import { playlistActions } from '@/redux/actions/playlistActions';
import { playlistNotification } from '../lib/playlistNotification';

export const useAddVideoToSavedOption = ({
  videoData,
  changeState,
}: IGetActions): TVideoAction => {
  const { saved, videoId } = videoData;

  const { isAuth } = useSelector(selectors.userSelector);
  const { setDeletedVideoFromPlaylistId } = useActions(playlistActions);

  const [deleteVideoFromPersonalPlaylist] =
    useLazyDeleteVideoFromPersonalPlaylistQuery();
  const [addVideoToPersonalPlaylist] = useLazyAddVideoToPersonalPlaylistQuery();

  const { t } = useTranslation();
  const { openAuthWarning } = useAuthWarning();

  const { openModal, setModalState } = useChooseUserPlaylistModal();

  const label = saved
    ? t('Playlist_Dropdown_Remove_From_Saved')
    : t('Playlist_Dropdown_Save_Video');

  const onFinishHandler = async (
    playlistId?: string,
    playlistName?: string,
  ) => {
    if (playlistId && playlistName) {
      await addVideoToPersonalPlaylist({
        playlistId,
        videoIds: [videoData.videoId],
      });
      changeState?.({
        saved: true,
      });
      playlistNotification({
        preview: videoData.thumbnailUrl!,
        actionType: 'add',
        videoId: videoData.videoId,
        text: t('Playlist_Save_Video_Notification', { playlistName }),
      });
    }
  };

  const addHandler = () => {
    if (!isAuth) {
      openAuthWarning(
        t('Playlist_Not_Auth'),
        'not-auth-save-video-to-playlists',
      );

      return;
    }
    openModal();
    setModalState({ onFinish: onFinishHandler });
  };

  const deleteHandler = async () => {
    if (!isAuth) {
      openAuthWarning(
        t('Playlist_Not_Auth'),
        'not-auth-save-video-to-playlists',
      );

      return;
    }
    await deleteVideoFromPersonalPlaylist({ videoId });
    setDeletedVideoFromPlaylistId({ videoId });
    changeState?.({
      saved: false,
    });
    playlistNotification({
      preview: videoData.thumbnailUrl!,
      actionType: 'remove',
      videoId: videoData.videoId,
      text: t('Playlist_Notification_Remove_Text'),
    });
  };

  const toggleHandler = saved ? deleteHandler : addHandler;

  const icon = saved ? <TrashIcon /> : <SaveDisketteIcon opacity={0.7} />;

  return {
    label,
    icon,
    onClick: toggleHandler,
  };
};
