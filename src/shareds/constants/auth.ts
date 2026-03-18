import { TListCommonLanguage, TListCredantialServiceType } from './globalTypes';

export const ACCESS_TOKEN_TYPE = 'x-rup-type';
export const ACCESS_TOKEN_COOKIE = 'access-token';
export const ACCESS_TOKEN_EXPIRESAT = 'access-token-expiresat';
export const USER_ID_COOKIE = 'user_id';
export const APPLICATION_ID_REQUEST_HEADER_NAME = 'x-rup-application-id';
export const APPLICATION_ID = '3890650e-c46d-4eaf-97a7-95309aa6f722';
export const CREATE_CHANNEL_COOKIES_NAME = 'createChannel';
export enum TokenType {
  unknown = 'unknown',
  user = 1,
  device,
}
export const COMMON_CREDENTIAL_SERVICE_TYPE: TListCredantialServiceType = {
  Undefined: 'CREDENTIAL_SERVICE_TYPE_UNDEFINED',
  Phone: 'CREDENTIAL_SERVICE_TYPE_PHONE',
  Email: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
};

export const COMMON_LANGUAGE: TListCommonLanguage = {
  Invalid: 'LANGUAGE_INVALID',
  Ru: 'LANGUAGE_RU',
  En: 'LANGUAGE_EN',
};

/*
* 1 - auth token
* 2 - device token
* */
export type TTokenTypes = 1 | 2;
