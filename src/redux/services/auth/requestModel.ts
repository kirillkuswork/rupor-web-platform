import {
  TCommonGender,
  TCredentialServiceTypes,
} from '@/shareds/constants/globalTypes';
import { CommonLanguageType } from '@/features/Auth/types';
import { IConfirm, IDeclare } from '@/redux/services/auth/baseTypes';

export interface IExistsRequest {
  service: TCredentialServiceTypes;
  value: string;
}

interface IUserDeclare {
  name: string;
  gender?: TCommonGender;
  age?: string;
}

export interface IDeclareRequest {
  user?: IUserDeclare;
  service: TCredentialServiceTypes;
  input: string;
  language: CommonLanguageType;
}

export interface IConfirmRequest {
  authType?: string;
  confirmCodeId: string;
  confirmCodeValue: string;
}

// NEW Interfaces
// Login
export interface INewLoginDeclareRequest extends IDeclare {}
export interface INewLoginConfirmRequest extends IConfirm {}

// Registration
interface INewUserDeclare {
  name: string;
}
export interface INewRegDeclareRequest extends IDeclare {
  user?: INewUserDeclare;
}
export interface INewRegConfirmRequest extends IConfirm {}

// Reset
export interface INewResetDeclareRequest extends Omit<IDeclare, 'password'> {}
export interface INewResetConfirmRequest extends IConfirm {
  password: IDeclare['password']
}

// Refresh
export interface INewRefreshRequest {
  refresh: string;
}

// Device
export interface INewDeviceRequest {
  uid: string,
}
