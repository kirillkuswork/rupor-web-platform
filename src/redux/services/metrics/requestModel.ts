export type TMetricsEvents = 'video_viewed'
| 'video_depth'
| 'video_breakpoint'
| 'video_shared'
| 'videoplayer_loaded'
| 'videoplayer_error';

export interface IMapEventTypeToPayload {
  'video_depth': {
    video_id: string
    user_id?: string
    video_total_duration: number
    video_timeline_current_at: number
    video_point_time: number
  }
  video_viewed: {
    video_id: string
  },
  video_breakpoint: {
    breakpoint: number
  }
  video_shared: {}
  videoplayer_loaded: {}
  videoplayer_error: {}
}

export interface IMetricsModel<T extends TMetricsEvents> {
  'event_type'?: T;
  'event_at'?: number;
  'source'?: T;
  'payload'?: IMapEventTypeToPayload[T];
  'created_at'?: string;
}

export interface ISendMetricsRequest <T extends TMetricsEvents> {
  'events'?: IMetricsModel<T>[];
  'userID'?: string;
  'deviceID'?: string;
}
