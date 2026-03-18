import { IGetActions, TVideoAction } from '@/entities/Video';
import { Notification, TrashIcon } from 'rupor-ui-kit';
import { useDeleteVideoFromHistoryMutation, useLazyGetHistoryVideosQuery } from '@/redux/services/playlist';
import { useTranslation } from 'react-i18next';

export const useDeleteVideoFromHistoryOption = ({ videoData }: IGetActions): TVideoAction => {
  const { t } = useTranslation();

  const label = t('Video_Option_Delete_Video_From_History');

  const { videoId } = videoData;

  const [deleteVideoFromHistory] = useDeleteVideoFromHistoryMutation();
  const [getVideos] = useLazyGetHistoryVideosQuery();

  const deleteHandler = async () => {
    try {
      await deleteVideoFromHistory({ videoId }).unwrap();
      await getVideos({ limit: 100 }).unwrap();
    } catch (e) {
      // TODO:: Сделать перевод
      Notification.add({
        content: 'Произошла ошибка при удалении из плейлиста',
        duration: 1500,
      });
    }
  };

  const icon = <TrashIcon />;

  return {
    label,
    icon,
    onClick: deleteHandler,
  };
};
