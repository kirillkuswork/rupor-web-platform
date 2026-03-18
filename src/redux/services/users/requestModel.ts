import { TCredentialServiceTypes } from '@/shareds/constants/globalTypes';
import { CommonLanguageType } from '@/features/Auth/types';

export interface IUpdateUserRequest {
  id?: string;
  name?: string;
  about?: string;
  avatarFileId?: string;
}

// SETTINGS
// Change Password
export interface IChangeCredentialsDeclareRequest {
  service: TCredentialServiceTypes;
  input: string
  language: CommonLanguageType;
}

export interface IChangeDeclareRequest {
  service: TCredentialServiceTypes;
  password: string
  language: CommonLanguageType;
}

export interface IChangeConfirmRequest {
  settingsType?: string;
  confirmCodeId: string;
  confirmCodeValue: string;
}
