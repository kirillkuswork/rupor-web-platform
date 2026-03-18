import { useTranslation } from 'next-i18next';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { HFlex } from '@/shareds/ui/Flex';
import { CardsQueue, DownArrowIcon, TrashIcon } from 'rupor-ui-kit';
import clsx from 'clsx';
import { useEffect } from 'react';
import { setIsQueueMounted } from '@/redux/slices/videoQueue';
import { useRouter } from 'next/router';

interface IVideoQueueHeaderProps {
  isQueueOpen?: boolean;
  toggleQueueHandler?: () => void;
  isDeleteAllQueue: boolean;
  onDeleteQueueHandler: () => void;
}

export const VideoQueueHeader = (props: IVideoQueueHeaderProps) => {
  const {
    isQueueOpen,
    toggleQueueHandler,
    onDeleteQueueHandler,
    isDeleteAllQueue,
  } = props;

  const { t } = useTranslation();
  const router = useRouter();
  const videoId = String(router?.query?.id);

  const dispatch = useDispatch();

  const { isMobile } = useIsMobile();

  const { videoQueue } = useSelector(
    selectors.videoQueueSelectors.videoQueueSelector,
  );
  const currentPlayingVideoId = useSelector(
    selectors.videoQueueSelectors.currentPlayingVideoIdSelector,
  );

  const videoQueueLength = videoQueue?.length;

  const currentVideoIndex = () => {
    if (currentPlayingVideoId) return videoQueue.indexOf(currentPlayingVideoId) + 1;
    if (videoId) return videoQueue.indexOf(videoId) + 1;
    return 1;
  };

  useEffect(() => {
    dispatch(setIsQueueMounted(true));
    return () => {
      dispatch(setIsQueueMounted(false));
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <span
            data-testid="video-queue-title"
            className="text-[18px] font-bold pr-3"
          >
            {t('Video_Queue_Header_Mobile_Title_Text')}
          </span>
          <span
            data-testid="video-queue-length"
            className="text-[12px] font-semibold text-[rgba(255,255,255,.4)]"
          >
            {`${currentVideoIndex()}/${videoQueueLength}`}
          </span>
        </div>
        <div className="cursor-pointer" onClick={onDeleteQueueHandler}>
          <TrashIcon data-testid="video-queue-clear-icon" color="#767678" />
        </div>
      </div>
    );
  }

  return (
    <CardsQueue.Header
      data-testid="video-queue-hide-show-button"
      onClick={toggleQueueHandler}
    >
      <HFlex maxWidth={false} gap="4">
        <span data-testid="video-queue-title">{`${t('Video_Queue')}`}</span>
        <span data-testid="video-queue-length">{`${currentVideoIndex()}/${videoQueueLength}`}</span>
      </HFlex>
      {!isDeleteAllQueue && (
        <CardsQueue.BaseButton
          data-testid="video-queue-clear-button"
          onClick={onDeleteQueueHandler}
        >
          {t('Video_Queue_Header_Queue')}
        </CardsQueue.BaseButton>
      )}
      <div
        className={clsx(
          isQueueOpen ? 'rotate-180' : 'rotate-0',
          'duration-200',
        )}
      >
        <DownArrowIcon data-testid="video-queue-show-hide-icon" />
      </div>
    </CardsQueue.Header>
  );
};
