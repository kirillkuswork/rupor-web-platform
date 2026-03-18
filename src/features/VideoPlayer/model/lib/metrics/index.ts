import { IMetricsModel, TMetricsEvents } from '@/redux/services/metrics/requestModel';
import { openVideoEventsDB, sendVideoMetrics } from '../../hooks/useMetrics/useSendVideoMetrics';
import { VIDEO_EVENTS_STORE, VIDEO_EVENTS_STORE_LIMIT } from '../../const/metrics';
import { IEventHandler } from '../../types/metrics';

export const saveEventToIDB = async (event: IMetricsModel<TMetricsEvents>) => {
  const db = await openVideoEventsDB();
  if ((await db.getAllKeys(VIDEO_EVENTS_STORE)).length >= VIDEO_EVENTS_STORE_LIMIT) {
    sendVideoMetrics();
  }

  db.add(VIDEO_EVENTS_STORE, event);
};

export const eventHandler = async <T extends TMetricsEvents>({
  eventType, payload,
}: IEventHandler<T>) => {
  const videoMetrics: IMetricsModel<T> = {
    event_type: eventType,
    event_at: Date.now(),
  };

  if (payload) {
    videoMetrics.payload = payload;
  }

  await saveEventToIDB(videoMetrics);
};
