import { IGetActions, TVideoAction } from '@/entities/Video';
import { TrashIcon } from 'rupor-ui-kit';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import {
  useLazyDeleteVideoFromPersonalPlaylistQuery,
} from '@/redux/services/playlist';
import { useActions } from '@/shareds/hooks/useActions';
import { playlistActions } from '@/redux/actions/playlistActions';
import { useTranslation } from 'next-i18next';
import { playlistNotification } from '../lib/playlistNotification';

export const useDeleteVideoFromPlaylistOption = ({ videoData, changeState }: IGetActions): TVideoAction => {
  const { isAuth } = useSelector(selectors.userSelector);
  const { editedPlaylistName } = useSelector(selectors.playlistSelector);
  const { setDeletedVideoFromPlaylistId } = useActions(playlistActions);
  const { videoId } = videoData;

  const { t } = useTranslation();

  const [deleteVideoFromPersonalPlaylist] = useLazyDeleteVideoFromPersonalPlaylistQuery();

  // TODO translate
  const label = editedPlaylistName ? t('Playlist_Dropdown_Remove_From_Edited', { editedPlaylistName }) : t('Playlist_Dropdown_Remove_From_Saved');
  const icon = <TrashIcon />;

  const deleteHandler = async () => {
    if (!isAuth) return;
    await deleteVideoFromPersonalPlaylist({ videoId });
    setDeletedVideoFromPlaylistId({ videoId });
    changeState?.({
      saved: false,
    });
    playlistNotification({
      preview: videoData.thumbnailUrl!,
      actionType: 'remove',
      videoId: videoData.videoId,
      text: t('Playlist_Delete_Video_Notification', { playlistName: editedPlaylistName || t('Saved_Playlist_Name') }),
    });
  };

  return {
    label,
    icon,
    onClick: deleteHandler,
  };
};
