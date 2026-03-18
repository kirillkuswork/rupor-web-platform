import { ICurrentCredential } from '@/redux/services/auth/responseModel';
import { TTokenTypes } from '@/shareds/constants/auth';
import { IBaseAvatar } from './baseTypes';

export interface IMeResponse {
  id?: string,
  name?: string,
  privilege?: string,
  about?: string,
  registeredAt?: string,
  updatedAt?: string,
  deletedAt?: string,
  avatar?: IBaseAvatar,
  pid?: string
  isAdult?: boolean
}

export interface IBackendAvatar {
  CreatedAt: string;
  ID: string;
  MimeType: string;
  Size: number;
  URL: string;
  UpdatedAt: string;
  UploadPath: string;
}

export interface IMeResponseBackend {
  id?: string;
  name?: string;
  privilege?: string;
  about?: string;
  registeredAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  avatar?: IBackendAvatar;
  pid?: string;
  isAdult?: boolean;
}

export interface ICurrentCredentialsResponse {
  items: ICurrentCredential[];
}

export interface ILogoutResponse {
  token: string;
  tokenType: TTokenTypes;
}
