import { IGetActions, TVideoAction } from '@/entities/Video';
import { useTranslation } from 'next-i18next';
import { MovingIcon } from 'rupor-ui-kit';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useMoveVideoToAnotherPlaylistMutation } from '@/redux/services/playlist';
import { useChooseUserPlaylistModal } from '@/modals/ChoosePlaylistModal';
import { playlistNotification } from '@/features/AddVideoToPlaylist/model/lib/playlistNotification';
import { useActions } from '@/shareds/hooks/useActions';
import { playlistActions } from '@/redux/actions/playlistActions';

export const useMoveVideoToAnotherPlaylist = ({ videoData }: IGetActions): TVideoAction => {
  const { videoId, playlistId: currentPlaylist, thumbnailUrl } = videoData;

  const { t } = useTranslation();
  // На всякий случай закомментил, если что-то поломает, то вернуть
  // const dispatch = useDispatch<AppDispatchType>();
  // const { sortPlaylistsBy, sortVideosBy } = useSelector(getMyPlaylistsSelectors.getFetchParams);
  const { isAuth } = useSelector(selectors.userSelector);
  const { setDeletedVideoFromPlaylistId } = useActions(playlistActions);

  const [moveVideToAnotherPlaylist] = useMoveVideoToAnotherPlaylistMutation();
  const { openModal, setModalState, setType } = useChooseUserPlaylistModal();

  const label = t('Playlist_Dropdown_Move_Video');

  const onFinishHandler = async (playlistId?: string, playlistName?: string) => {
    if (playlistId && currentPlaylist) {
      await moveVideToAnotherPlaylist({ fromPlaylistId: currentPlaylist, toPlaylistId: playlistId, videoId }).unwrap();
      // На всякий случай закомментил, если что-то поломает, то вернуть
      // await dispatch(fetchMyPlaylists({ sortPlaylistsCreatedAt: sortPlaylistsBy, sortVideos: sortVideosBy })).unwrap();
      setDeletedVideoFromPlaylistId({ videoId });
      playlistNotification({
        preview: thumbnailUrl!,
        actionType: 'add',
        videoId,
        text: t('Playlist_Move_Video_Notification', { playlistName }),
      });
    }
  };

  const addHandler = () => {
    if (!isAuth) return;
    openModal();
    setType('move');
    setModalState({ onFinish: onFinishHandler });
  };

  return {
    label,
    icon: <MovingIcon />,
    onClick: addHandler,
  };
};
