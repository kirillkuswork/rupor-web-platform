export type TPlayerMetric = {
  name: 'heartbeat' | 'play_start' | 'player_load';
  method: 'GET' | 'POST';
  url_template: string;
  body: string;
  start: number;
  count: number;
  delay: number;
};
