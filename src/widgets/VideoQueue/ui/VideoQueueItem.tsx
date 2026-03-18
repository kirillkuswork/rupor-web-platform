import Link from 'next/link';
import { LEGAL_AGE } from '@/shareds/constants/restrictions';
import { useDispatch, useSelector } from 'react-redux';
import { videoQueueSelectors } from '@/redux/selectors/videoQueueSelectors';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { Notification, RepeatIcon } from 'rupor-ui-kit';
import { PlaybackIcon, useFetchVideoThumbnail, VideoActions } from '@/entities/Video';
import { changeVideoQueueStep, removeVideoFromQueue } from '@/redux/slices/videoQueue';
import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { CardsQueue } from '@/shareds/ui';
import { selectors } from '@/redux/selectors';
import { useSetPlaybackStateToVideoQueue } from '../model/hooks/useSetPlaybackStateToVideoQueue';
import { usePlayNextVideo } from '../model/hooks/usePlayNextVideo';

interface IVideoQueueItemProps {
  videoId: string;
}

export const VideoQueueItem = ({ videoId }: IVideoQueueItemProps) => {
  const { videoInQueueData } = useSelector(
    videoQueueSelectors.videoQueueSelector,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const videoData = videoInQueueData[videoId] ?? {};

  const {
    queueStep,
    ageRating,
    thumbnailUrl = '',
    videoTitle,
    channelTitle,
    playbackState,
    uploadingSource = 'RUPOR',
  } = videoData;

  const { thumbnailBlob, isError: isImageError, isLoading: isImageLoading } = useFetchVideoThumbnail({ uploadingSource, thumbnailUrl });

  const videoActions = useGetVideoActions({
    actionsList: [
      'addToWatchLater',
      'addToQueue',
      'addToSaved',
      'addReportToVideo',
    ],
  })({ videoData });

  const videoLink = `${APP_PATHS_PAGES.videos}/${videoId}`;

  const currentVideoInstance = useSelector(selectors.videoPlayerSelectors.getVideoPlayerStateSelector(videoId));

  const onDeleteHandler = () => {
    if (queueStep?.current === 'delete') {
      dispatch(removeVideoFromQueue(videoId));
      Notification.add({
        content: t('Notify_Remove_Video_Success'),
        dti: `remove-video-from-queue-notification_${videoData.videoId}`,
        duration: 2000,
      });
    }
  };

  const onCancelAddHandler = () => {
    dispatch(removeVideoFromQueue(videoId));
  };

  const onCancelDeleteHandler = () => {
    const step = queueStep.previous ?? 'initial';
    dispatch(changeVideoQueueStep({ videoId, step }));
  };

  const handleLinkClick = useCallback(
    (id: string) => () => {
      const isCurrentVideo = id === currentVideoInstance?.videoId;
      if (!isCurrentVideo) return;
      currentVideoInstance?.playerInstance?.playerReload?.();
    },
    [currentVideoInstance],
  );

  const handleOnAdd = () => {
    dispatch(changeVideoQueueStep({ videoId, step: 'initial' }));
  };

  usePlayNextVideo({ videoId });
  useSetPlaybackStateToVideoQueue();

  const dataTestId = 'video-queue';

  return (
    <CardsQueue.Item
      className="relative"
      step={queueStep?.current}
      onAdd={handleOnAdd}
    >
      <Link href={videoLink} onClick={handleLinkClick(videoId)}>
        <CardsQueue.CardWrapper>
          <CardsQueue.PlayedIconWrapper>
            <PlaybackIcon
              data-testid={`${dataTestId}-playback-icon_${videoId}`}
              playbackState={playbackState}
              iconProps={{
                pause: {
                  small: true,
                },
              }}
            />
          </CardsQueue.PlayedIconWrapper>
          <CardsQueue.PreviewQueue
            data-testid={`${dataTestId}-preview_${videoId}`}
            isAdultContent={ageRating === LEGAL_AGE}
            ageRatingText="18+"
            className="cursor-pointer"
            useExternalLoadControl
            isImageError={isImageError}
            isImageLoading={isImageLoading}
            src={thumbnailBlob}
            alt={videoTitle}
            id={videoId}
          >
            {queueStep?.current === 'watched' && (
              <RepeatIcon
                data-testid={`${dataTestId}-repeat-icon_${videoId}`}
                className="w-6 h-6 absolute-center"
              />
            )}
          </CardsQueue.PreviewQueue>
          <CardsQueue.InfoWrapper>
            <CardsQueue.Title data-testid={`${dataTestId}-title_${videoId}`}>
              {videoTitle}
            </CardsQueue.Title>
            <CardsQueue.Label
              data-testid={`${dataTestId}-channel-title_${videoId}`}
            >
              {queueStep?.current === 'added' ? t('Video_Queue_Item_Cards_Queue_Message') : channelTitle}
            </CardsQueue.Label>
          </CardsQueue.InfoWrapper>
          <div onClick={(event) => event.preventDefault()}>
            <CardsQueue.CancelAddBtn onClick={onCancelAddHandler}>
              {t('Video_Queue_Item_Cards_Queue_Button')}
            </CardsQueue.CancelAddBtn>
          </div>
          {queueStep?.current !== 'added' && (
            <div onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            >
              <VideoActions
                videoId={videoId}
                dti={dataTestId}
                videoActions={videoActions}
              />
            </div>
          )}
        </CardsQueue.CardWrapper>
      </Link>
      <CardsQueue.DeleteWrapper>
        <CardsQueue.InfoWrapper>
          <CardsQueue.Title data-testid={`${dataTestId}-title_${videoId}`}>
            {videoTitle}
          </CardsQueue.Title>
          <CardsQueue.Label>
            <CardsQueue.DeleteTimer
              data-testid={`${dataTestId}-timer_${videoId}`}
              seconds={5}
              onEnd={onDeleteHandler}
            />
            {t('Video_Queue_Item_Cards_Queue_Deleted')}
          </CardsQueue.Label>
        </CardsQueue.InfoWrapper>
        <CardsQueue.CancelDelButton
          data-testid={`${dataTestId}-delete-button_${videoId}`}
          onClick={onCancelDeleteHandler}
        >
          {t('Video_Queue_Item_Cards_Queue_Button')}
        </CardsQueue.CancelDelButton>
      </CardsQueue.DeleteWrapper>
    </CardsQueue.Item>
  );
};
