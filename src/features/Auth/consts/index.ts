import SuperExpressive from 'super-expressive';
import { UseConfirmErrorCode, UseDeclareErrorCode } from '@/modals/AuthModal/types';

export const authLocalesPhone = {
  title: 'Modal_Information_Confirm_Title_Phone',
  description: 'Modal_Information_Confirm_Description_Attempts_Phone',
  info: 'Modal_Information_Confirm_Description_Auth_Phone',
  submitBtnTitle: 'Modal_Information_Confirm_SubmitBtn_Auth_Phone',
};

export const authLocalesEmail = {
  title: 'Modal_Information_Confirm_Title_Email',
  description: 'Modal_Information_Confirm_Description_Attempts_Email',
  info: 'Modal_Information_Confirm_Description_Auth_Email',
  submitBtnTitle: 'Modal_Information_Confirm_SubmitBtn_Auth_Email',
};

export const registrationLocalesPhone = {
  title: 'Modal_Information_Confirm_Title_Phone',
  description: 'Modal_Information_Confirm_Description_Attempts_Phone',
  info: 'Modal_Information_Confirm_Description_Reg_Phone',
  submitBtnTitle: 'Modal_Information_Confirm_SubmitBtn_Reg_Phone',
};

export const registrationLocalesEmail = {
  title: 'Modal_Information_Confirm_Title_Email',
  description: 'Modal_Information_Confirm_Description_Attempts_Email',
  info: 'Modal_Information_Confirm_Description_Reg_Email',
  submitBtnTitle: 'Modal_Information_Confirm_SubmitBtn_Reg_Email',
};

export const OTP_INPUT_LENGTH = 4;
export const ATTEMPTS_COUNT = 3;
export const DECLARE_ATTEMPTS_COUNT = 3;
export const CONFIRM_ATTEMPTS_COUNT = 3;

export const declareErrorCodes: Record<string, UseDeclareErrorCode> = {
  empty: '',
  registrationExpiredCode: 'registration.expired_code',
  phoneTooManyRequests1Minute: 'phone.too_many_requests_1_min',
  phoneTooManyRequests1Hour: 'phone.too_many_requests_1_hour',
  temporarilyBlocked1Hour: 'credential.temporarily_blocked_1_hour',
  emailValidationError: 'email.validation_error',
};

export const confirmErrorCodes: Record<string, UseConfirmErrorCode> = {
  empty: '',
  invalid: 'confirm_code.invalid',
  manyAttempts: 'confirm_code.many_attempts',
  attemptsLimitExceeded: 'confirm_code.attempts_limit_exceeded',
  expired: 'confirm_code.expired',
};

export const FORM_IDS = {
  login: 'login-modal-form',
  registration: 'registration-modal-form',
};

export const USER_NAME_AVAILABLE_SYMBOLS_INFO = '. _ -';

export const CommonCredentialServiceTypes = {
  Undefined: 'CREDENTIAL_SERVICE_TYPE_UNDEFINED',
  Phone: 'CREDENTIAL_SERVICE_TYPE_PHONE',
  Email: 'CREDENTIAL_SERVICE_TYPE_EMAIL',
} as const;

/*
*    @returns /(?:\s|[0-9\+\-]){1,12}/
*/
export const ONLY_PHONE_SYMBOLS_REGEX = SuperExpressive()
  .between(1, 12)
  .anyOf
  .range('0', '9')
  .char('+')
  .char('-')
  .whitespaceChar
  .end()
  .toRegex();
/*
*    @returns /^\+[0-9]{11}$/
*/
export const CORRECT_PHONE_NUMBER_REGEX = SuperExpressive()
  .startOfInput
  .char('+')
  .exactly(11)
  .anyOf
  .range('0', '9')
  .end()
  .endOfInput
  .toRegex();
