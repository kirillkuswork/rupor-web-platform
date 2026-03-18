import { DBSchema, openDB } from 'idb';

import { IMetricsModel, TMetricsEvents } from '@/redux/services/metrics/requestModel';
import { useEffect, useRef } from 'react';
import { store } from '@/redux/store/store';
import { metricsApi } from '@/redux/services/metrics';
import { VIDEO_EVENTS_DB_NAME, VIDEO_EVENTS_DB_VERSION, VIDEO_EVENTS_STORE } from '../../const/metrics';

const sendVideoMetricsIntervalTime = 10_000;

interface EventsDB extends DBSchema {
  [VIDEO_EVENTS_STORE]: {
    value: IMetricsModel<TMetricsEvents>;
    key: string;
  };
}

export const openVideoEventsDB = async () => openDB<EventsDB>(
  VIDEO_EVENTS_DB_NAME,
  VIDEO_EVENTS_DB_VERSION,
  {
    upgrade(updatedb) {
      if (updatedb.objectStoreNames.contains(VIDEO_EVENTS_STORE)) {
        updatedb.deleteObjectStore(VIDEO_EVENTS_STORE);
      }
      updatedb.createObjectStore(VIDEO_EVENTS_STORE, { keyPath: 'id', autoIncrement: true });
    },
  },
);

export const sendVideoMetrics = async () => {
  if (typeof window === 'undefined') {
    return;
  }
  const db = await openVideoEventsDB();

  const cutDataTransaction = db.transaction(VIDEO_EVENTS_STORE, 'readwrite');
  const data = await cutDataTransaction.store.getAll();
  await cutDataTransaction.store.clear();
  await cutDataTransaction.done;

  // remove id from db
  const eventsData = data.map(
    ({ event_type, event_at, payload }) => ({ event_type, event_at, payload }),
  );
  try {
    if (data?.length) {
      await store.dispatch(metricsApi.endpoints.sendEvents.initiate({
        events: eventsData as IMetricsModel<TMetricsEvents>[],
      }));
    }
  } catch {
    const revertDataTransaction = db.transaction(VIDEO_EVENTS_STORE, 'readwrite');
    await Promise.all(eventsData.map((event) => revertDataTransaction.store.add(event)));
  }
};

export const useSendVideoMetrics = () => {
  const id = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    id.current = setInterval(sendVideoMetrics, sendVideoMetricsIntervalTime);
    return () => clearInterval(id.current);
  }, []);
};
