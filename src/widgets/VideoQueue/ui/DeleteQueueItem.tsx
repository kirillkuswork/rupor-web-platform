import { CardsQueue } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

interface IDeleteQueueItem {
  cancelDeleteHandler: () => void
  deleteHandler: () => void
}

export const DeleteQueueItem = ({ cancelDeleteHandler, deleteHandler }: IDeleteQueueItem) => {
  const { t } = useTranslation();

  return (
    <CardsQueue.Item
      step="delete"
      className="rounded-lg"
    >
      <CardsQueue.DeleteWrapper>
        <CardsQueue.InfoWrapper>
          <CardsQueue.Title data-testid="video-queue-delete-title">
            {t('Delete_Queue_Item_Title')}
          </CardsQueue.Title>
          <CardsQueue.Label>
            <CardsQueue.DeleteTimer
              data-testid="video-queue-delete-timer"
              seconds={5}
              onEnd={deleteHandler}
            />
            {t('Delete_Queue_Item_Label')}
          </CardsQueue.Label>
        </CardsQueue.InfoWrapper>
        <CardsQueue.CancelDelButton
          data-testid="video-queue-delete-button"
          onClick={cancelDeleteHandler}
        >
          {t('Delete_Queue_Item_Button')}
        </CardsQueue.CancelDelButton>
      </CardsQueue.DeleteWrapper>
    </CardsQueue.Item>
  );
};
