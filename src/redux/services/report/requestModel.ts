import { TTechnicalComplainType, TVideoComplainType } from './responseModel';

export interface IAddVideoComplainRequest {
  videoId?: string;
  complaints?: TVideoComplainType[];
  comment?: string;
}

interface IQuestion {
  id?: string;
  name?: string;
}

export interface IAddProblemReportRequest {
  category?: IQuestion;
  question?: IQuestion;
  userEmail?: string;
  comment?: string;
}

export interface IAddTechnicalComplainRequest {
  'videoId'?: string;
  'videoLink'?: string;
  'problems'?: TTechnicalComplainType[];
  'comment'?: string;
  'userAgent'?: string;
  'userEmail'?: string;
}
