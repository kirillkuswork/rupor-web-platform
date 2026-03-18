import { HFlex } from '@/shareds/ui/Flex';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { CardsQueue, DownArrowIcon } from 'rupor-ui-kit';

interface IVideoQueueHeaderDesktopProps {
  currentVideoIndex: number
  videoQueueLength: number
  onDeleteQueueHandler: () => void
  toggleQueueHandler: () => void
  isDeleteAllQueue: boolean
  isQueueOpen: boolean
}

export const VideoQueueHeaderDesktop = (props: IVideoQueueHeaderDesktopProps) => {
  const { t } = useTranslation();

  const {
    currentVideoIndex,
    videoQueueLength,
    toggleQueueHandler,
    onDeleteQueueHandler,
    isDeleteAllQueue,
    isQueueOpen,
  } = props;

  return (
    <CardsQueue.Header onClick={toggleQueueHandler}>
      <HFlex maxWidth={false} gap="4">
        <span>
          {t('Video_Queue')}
        </span>
        <span>
          {`${currentVideoIndex}/${videoQueueLength}`}
        </span>
      </HFlex>
      {
          !isDeleteAllQueue && (
          <CardsQueue.BaseButton onClick={onDeleteQueueHandler}>
            {t('Video_Queue_Header_Desktop_Clear_Queue')}
          </CardsQueue.BaseButton>
          )
      }
      <div className={clsx(isQueueOpen ? 'rotate-180' : 'rotate-0', 'duration-200')}>
        <DownArrowIcon />
      </div>
    </CardsQueue.Header>
  );
};
