import { IGetActions, TVideoAction } from '@/entities/Video';
import { BrightCLockIcon } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { MouseEvent } from 'react';

import {
  useLazyAddVideoToWatchLaterPlaylistQuery,
  useLazyDeleteVideoFromWatchLaterPlaylistQuery,
} from '@/redux/services/playlist';
import { useActions } from '@/shareds/hooks/useActions';
import { watchLaterSliceActions } from '@/redux/slices/watchLaterSlice';
import { watchLaterNotification } from '../lib/watchLaterNotification';

export const useAddVideoToWatchLaterOption = ({
  videoData,
  changeState,
}: IGetActions): TVideoAction => {
  const { watchLater, videoId } = videoData;

  const { t } = useTranslation();

  const { isAuth } = useSelector(selectors.userSelector);
  const { watchLaterTotalCount } = useSelector(selectors.watchLaterSelectors);
  const { setWatchLaterTotalCount } = useActions(watchLaterSliceActions);

  const [addVideoToWatchLater] = useLazyAddVideoToWatchLaterPlaylistQuery();
  const [deleteVideoFromWatchLater] = useLazyDeleteVideoFromWatchLaterPlaylistQuery();

  const label = watchLater
    ? t('Video_Option_Delete_Video_From_Watchlist')
    : t('Video_Option_Add_Video_To_Watchlist');

  const addHandler = async (
    event?: MouseEvent<HTMLElement & HTMLButtonElement>,
  ) => {
    event?.preventDefault();
    // if (!isAuth) {
    //   openAuthWarning(
    //     t('Add_Video_To_Watch_Later_Option_Auth_Warning'),
    //     'not-auth-add-subscribe',
    //   );
    //
    //   return;
    // }
    const res = await addVideoToWatchLater({ videoId });
    if (!res.error) {
      watchLaterNotification({
        actionType: 'add',
        preview: videoData.thumbnailUrl!,
        videoId,
        text: t('Watch_Later_Notification_Add_Text'),
        dti: 'watch-later',
      });
      changeState?.({
        watchLater: true,
      });
    }
  };

  const deleteHandler = async (
    event?: MouseEvent<HTMLElement & HTMLButtonElement>,
  ) => {
    event?.preventDefault();
    if (!isAuth) return;
    const res = await deleteVideoFromWatchLater({ videoId });
    if (!res.error) {
      watchLaterNotification({
        actionType: 'remove',
        preview: videoData.thumbnailUrl!,
        videoId,
        text: t('Watch_Later_Notification_Remove_Text'),
        dti: 'watch-later',
      });
      changeState?.({
        watchLater: false,
      });
      if (watchLaterTotalCount) setWatchLaterTotalCount(watchLaterTotalCount - 1);
    }
  };

  const toggleHandler = watchLater ? deleteHandler : addHandler;

  return {
    label,
    icon: <BrightCLockIcon />,
    onClick: toggleHandler,
  };
};
