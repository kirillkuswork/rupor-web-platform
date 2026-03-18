export type TCredentialServiceTypes = 'CREDENTIAL_SERVICE_TYPE_UNDEFINED' | 'CREDENTIAL_SERVICE_TYPE_PHONE' | 'CREDENTIAL_SERVICE_TYPE_EMAIL';
type TListKeysServiceType = 'Phone' | 'Email' | 'Undefined';
export type TListCredantialServiceType = {
  [key in TListKeysServiceType]: TCredentialServiceTypes
};
export type TCommonGender = 'GENDER_UNSPECIFIED' | 'GENDER_MALE' | 'GENDER_FEMALE';
type TListKeysCommonGender = 'Unspecified' | 'Male' | 'Female';
export type TListCommonGender = {
  [key in TListKeysCommonGender]: TCommonGender
};
export type TCommonLanguage = 'LANGUAGE_INVALID' | 'LANGUAGE_RU' | 'LANGUAGE_EN';
type TListKeysCommonLanguage = 'Invalid' | 'Ru' | 'En';
export type TListCommonLanguage = {
  [key in TListKeysCommonLanguage]: TCommonLanguage
};
