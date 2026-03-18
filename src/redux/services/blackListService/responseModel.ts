import { TTokenTypes } from '@/shareds/constants/auth';
import { TCredentialServiceTypes } from '@/shareds/constants/globalTypes';

export interface IExistsResponse {
  exists: boolean,
  blocked: boolean,
}

export interface IDeclareResponse {
  confirmCodeId: string,
  receiver: string,
  expired: string, // format: 2024-11-19T02:33:46.911Z
  service: TCredentialServiceTypes,
  length: number,
  attempts: number
}

export interface IConfirmResponse {
  token: string,
  tokenType: TTokenTypes,
}
