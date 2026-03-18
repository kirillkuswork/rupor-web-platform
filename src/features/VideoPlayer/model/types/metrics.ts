import { IMapEventTypeToPayload, TMetricsEvents } from '@/redux/services/metrics/requestModel';

export interface IEventHandler <T extends TMetricsEvents> {
  eventType: T
  payload?: IMapEventTypeToPayload[T]
}
