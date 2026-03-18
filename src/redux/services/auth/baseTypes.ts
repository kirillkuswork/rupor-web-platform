import { TCredentialServiceTypes } from '@/shareds/constants/globalTypes';
import { CommonLanguageType } from '@/features/Auth/types';
import { TTokenTypes } from '@/shareds/constants/auth';

export interface IError {
  code: string;
  message: string;
  httpStatusCode: number;
}

export interface IDeclare {
  service: TCredentialServiceTypes;
  input: string;
  language: CommonLanguageType;
  password: string;
}

export interface IConfirm {
  confirmCodeId?: string;
  confirmCodeValue?: string;
}

export interface ITokenResponse {
  attempts: number;
  token: string;
  tokenType: TTokenTypes;
  expiredAt: string;
  refresh: string;
  isError: boolean
}
