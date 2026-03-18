import { TTokenTypes } from '@/shareds/constants/auth';
import { TCredentialServiceTypes } from '@/shareds/constants/globalTypes';
import { CommonCredentialServiceType } from '@/features/Auth/types';
import { ITokenResponse } from '@/redux/services/auth/baseTypes';

export interface IExistsResponse {
  exists: boolean;
  blocked: boolean;
}

export interface IDeclareResponse {
  confirmCodeId?: string;
  receiver?: string;
  expired?: string;
  service?: TCredentialServiceTypes;
  length?: number;
  attempts?: number;
  // если ошибка
  isError: boolean;
}

export interface IConfirmResponse {
  token: string;
  tokenType: TTokenTypes;
  expiredAt?: string
  refresh?: string
}

export interface ICurrentCredential {
  id?: string;
  service?: CommonCredentialServiceType;
  value?: string;
}

export interface IRefreshResponse {
  token: string;
  tokenType: TTokenTypes;
  expiredAt?: string
}

// NEW Interfaces

export interface INewDeclareResponse {
  confirmCodeId?: string;
  receiver?: string;
  expired?: string;
  service?: TCredentialServiceTypes;
  length?: number;
  attempts?: number;
  isError: boolean;
}

// RegDeclare
export interface INewRegDeclareResponse extends INewDeclareResponse {}

// LoginDeclare
export interface INewLoginDeclareResponse extends ITokenResponse {
  blockedUntil: number;
}

// ResetDeclare
export interface INewResetDeclareResponse extends INewDeclareResponse {}
export interface INewResetConfirmResponse extends ITokenResponse {}

// RegConfirm
export interface INewRegConfirmResponse extends ITokenResponse {}

// LoginConfirm
export interface INewLoginConfirmResponse extends ITokenResponse {}

// Refresh
export interface INewRefreshResponse extends ITokenResponse {}

// Device
export interface INewDeviceResponse extends Pick<ITokenResponse, 'token' | 'tokenType'> {}
