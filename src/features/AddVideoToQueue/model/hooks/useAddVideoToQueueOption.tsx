import { IGetActions, TVideoAction } from '@/entities/Video';
import { useTranslation } from 'next-i18next';
import {
  addVideoToQueue,
  changeVideoQueueStep,
  removeVideoFromQueue,
} from '@/redux/slices/videoQueue';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { FolderAddIcon, Notification } from 'rupor-ui-kit';
import { useActions } from '@/shareds/hooks/useActions';
import { useAuthWarning } from '@/shareds/hooks/useAuthWarning';

export const useAddVideoToQueueOption = ({
  videoData,
}: IGetActions): TVideoAction => {
  const { videoInQueueData, isQueueMounted } = useSelector(
    selectors.videoQueueSelectors.videoQueueSelector,
  );

  const {
    addVideoToQueue: addVideoToQueueAction,
    changeVideoQueueStep: changeVideoQueueStepAction,
    removeVideoFromQueue: removeVideoFromQueueAction,
  } = useActions({
    addVideoToQueue,
    changeVideoQueueStep,
    removeVideoFromQueue,
  });
  const { t } = useTranslation();
  const { isAuth } = useSelector(selectors.userSelector);
  const isAdded = videoInQueueData[videoData.videoId];
  const queueStep = videoInQueueData[videoData.videoId]?.queueStep;
  const { openAuthWarning } = useAuthWarning();
  const label = isAdded
    ? t('HVideo_Menu_Remove_Video_From_Queue')
    : t('HVideo_Menu_Add_Video_To_Queue');

  const addHandler = () => {
    const { getVideoActions, ...otherData } = videoData;
    if (!isAuth) {
      openAuthWarning(
        t('Add_Video_To_Queue_Option_Auth_Warning'),
        'not-auth-add-subscribe',
      );

      return;
    }
    addVideoToQueueAction(otherData);
    Notification.add({
      content: t('Notify_Add_Video_Success'),
      dti: `add-video-to-queue-notification_${videoData.videoId}`,
      duration: 2000,
    });
  };

  // Удаление видео сразу, без таймера
  const removeVideo = () => {
    removeVideoFromQueueAction(videoData.videoId);
    Notification.add({
      content: t('Notify_Remove_Video_Success'),
      dti: `remove-video-from-queue-notification_${videoData.videoId}`,
      duration: 2000,
    });
  };

  const deleteHandler = () => {
    // Если очередь вмонтирована в dom, то запускаем таймер на удаление
    // если не вмонтирована, то удаляем сразу, тк таймер не отработает
    if (isQueueMounted) {
      // Если таймер уже идет, то отменяем
      if (queueStep.current === 'delete') {
        const step = queueStep.previous ?? 'initial';
        changeVideoQueueStepAction({ videoId: videoData.videoId, step });
        // Если видео только добавлено, то удаляем сразу (аналог отмены добавления)
      } else if (queueStep.current === 'added') {
        removeVideo();
        // В остальных случаях запускаем таймер на удаление
      } else {
        changeVideoQueueStepAction({
          videoId: videoData.videoId,
          step: 'delete',
        });
      }
    } else {
      removeVideo();
    }
  };

  const toggleHandler = isAdded ? deleteHandler : addHandler;

  return {
    label,
    icon: <FolderAddIcon opacity={0.7} />,
    onClick: toggleHandler,
  };
};
