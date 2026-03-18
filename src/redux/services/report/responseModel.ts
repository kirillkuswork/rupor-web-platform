export type TVideoComplainType = 'VIDEO_COMPLAINT_UNDEFINED'
| 'VIDEO_COMPLAINT_SEX'
| 'VIDEO_COMPLAINT_VIOLENCE'
| 'VIDEO_COMPLAINT_COPYRIGHT'
| 'VIDEO_COMPLAINT_BANNED_ITEM'
| 'VIDEO_COMPLAINT_TERRORISM'
| 'VIDEO_COMPLAINT_HATE_SPEECH'
| 'VIDEO_COMPLAINT_SPAM'
| 'VIDEO_COMPLAINT_ANOTHER';

export interface IVideoComplain {
  'id'?: TVideoComplainType;
  'description'?: string;
}

export interface IGetVideoComplainsResponse {
  'items'?: IVideoComplain[];
}

export interface IAddVideoComplainResponse {
  'ticketId'?: number;
}

export type TTechnicalComplainType = 'PROBLEM_TYPE_VIDEO_UNDEFINED'
| 'PROBLEM_TYPE_VIDEO_PLAYING_FAILS'
| 'PROBLEM_TYPE_VIDEO_FREEZES'
| 'PROBLEM_TYPE_VIDEO_AUDIO_ISSUES'
| 'PROBLEM_TYPE_VIDEO_PLAYER_ISSUE'
| 'PROBLEM_TYPE_VIDEO_ANOTHER';

export interface ITechnicalComplain {
  'id'?: TTechnicalComplainType;
  'description'?: string;
}

export interface IGetTechnicalComplainsResponse {
  'items'?: ITechnicalComplain[];
}
