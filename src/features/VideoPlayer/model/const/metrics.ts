import { TPlayerMetric } from '@/entities/Video/model/types/metrics';

export const VIDEO_EVENTS_DB_NAME = 'VIDEO_EVENTS_DB_NAME';
export const VIDEO_EVENTS_DB_VERSION = 2;
export const VIDEO_EVENTS_STORE = 'VIDEO_EVENTS_STORE';
export const VIDEO_EVENTS_STORE_LIMIT = 1000;
export const TIME_FOR_IS_WATCHED = 3;

const urlTemplate = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/bi-metrics/v1/events` : '/';

export const metricsTemplates: TPlayerMetric[] = [
  {
    name: 'heartbeat',
    url_template: urlTemplate,
    start: 0,
    count: 4,
    delay: 10,
    method: 'POST',
    body:
        `{ "event_name": "heartbeat", "event_action": "{{event_action}}", "range_start":"{{range_start}}",
        "range_end":"{{range_end}}", "player_speed":"{{player_speed}}", "player_quality":"{{player_quality}}",
        "player_screen_size":"{{screen_size}}", "player_volume":"{{player_volume}}", "background_player": "0", "player_subs":"0",
        "player_version":"{{player_version}}", "device_orientation":"{{device_orientation}}", "touch_point": "web", "device_type":"{{device_type}}",
        "is_embed":"0", "player_view_id":"{{player_view_id}}", "player_name":"rupor", "content_id":"{{content_id}}", "page_url": "{{page_url}}",
        "event_timestamp": "{{event_timestamp}}", "event_timezone": "{{event_timezone}}", "cid": "{{cid}}", "session_id": "{{session_id}}", "user_id": "{{user_id}}",
         "user_auth": "{{user_auth}}",
        "user_agent": "{{user_agent}}"}`,
  },
  {
    name: 'heartbeat',
    url_template: urlTemplate,
    start: 40,
    count: 0,
    delay: 40,
    method: 'POST',
    body:
        `{ "event_name": "heartbeat", "event_action": "{{event_action}}", "range_start":"{{range_start}}",
        "range_end":"{{range_end}}", "player_speed":"{{player_speed}}", "player_quality":"{{player_quality}}",
        "player_screen_size":"{{screen_size}}", "player_volume":"{{player_volume}}", "background_player": "0", "player_subs":"0",
        "player_version":"{{player_version}}", "device_orientation":"{{device_orientation}}", "touch_point": "web", "device_type":"{{device_type}}",
        "is_embed":"0", "player_view_id":"{{player_view_id}}", "player_name":"rupor", "content_id":"{{content_id}}", "page_url": "{{page_url}}",
        "event_timestamp": "{{event_timestamp}}", "event_timezone": "{{event_timezone}}", "cid": "{{cid}}", "session_id": "{{session_id}}", "user_id": "{{user_id}}",
         "user_auth": "{{user_auth}}",
        "user_agent": "{{user_agent}}"}`,
  },
  {
    name: 'player_load',
    url_template: urlTemplate,
    start: 0,
    count: 0,
    delay: 0,
    method: 'POST',
    body:
        `{ "event_name": "player_load",  "event_action": "LD", 
        "player_screen_size":"{{screen_size}}", "background_player": "0", 
        "player_version":"{{player_version}}", "device_orientation":"{{device_orientation}}", "touch_point": "web", "device_type":"{{device_type}}", 
        "is_embed":"0", "player_view_id":"{{player_view_id}}", "player_name":"rupor", "content_id":"{{content_id}}", "page_url": "{{page_url}}", 
        "event_timestamp": "{{event_timestamp}}", "event_timezone": "{{event_timezone}}", "cid": "{{cid}}", "session_id": "{{session_id}}", 
        "user_id": "{{user_id}}", "user_auth": "{{user_auth}}", 
        "user_agent": "{{user_agent}}"}`,
  },
  {
    name: 'play_start',
    url_template: urlTemplate,
    start: 0,
    count: 0,
    delay: 0,
    method: 'POST',
    body:
        `{ "event_name": "play_start",  "event_action": "{{event_action}}", "player_speed":"{{player_speed}}", "player_quality":"{{player_quality}}", 
        "player_screen_size":"{{screen_size}}", "player_volume":"{{player_volume}}", "background_player": "0", "player_subs":"0", 
        "player_version":"{{player_version}}", "device_orientation":"{{device_orientation}}", "touch_point": "web", "device_type":"{{device_type}}", 
        "is_embed":"0", "player_view_id":"{{player_view_id}}", "player_name":"rupor", "content_id":"{{content_id}}", "page_url": "{{page_url}}", 
        "event_timestamp": "{{event_timestamp}}", "event_timezone": "{{event_timezone}}", "cid": "{{cid}}", "session_id": "{{session_id}}", 
        "user_id": "{{user_id}}", "user_auth": "{{user_auth}}",
        "user_agent": "{{user_agent}}"}`,
  },
];
