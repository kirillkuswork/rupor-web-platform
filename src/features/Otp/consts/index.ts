import { UseConfirmErrorCode, UseDeclareErrorCode } from '../types';

const ATTEMPTS_COUNT = 3;
const OTP_INPUT_LENGTH = 4;
const declareErrorCodes: Record<string, UseDeclareErrorCode> = {
  empty: '',
  registrationExpiredCode: 'registration.expired_code',
  phoneTooManyRequests1Minute: 'phone.too_many_requests_1_min',
  phoneTooManyRequests1Hour: 'phone.too_many_requests_1_hour',
  temporarilyBlocked1Hour: 'credential.temporarily_blocked_1_hour',
  emailValidationError: 'email.validation_error',
};
const confirmErrorCodes: Record<string, UseConfirmErrorCode> = {
  empty: '',
  invalid: 'confirm_code.forbidden',
  manyAttempts: 'confirm_code.many_attempts',
  attemptsLimitExceeded: 'confirm_code.attempts_limit_exceeded',
  expired: 'confirm_code.expired',
};
const authLocalesEmail = {
  title: 'Modal_OTP_Title_Email',
  description: 'Modal_OTP_Description_Email',
  informationText: 'Modal_OTP_Info_Support_Email',
};
const registrationLocalesEmail = authLocalesEmail;

export const otpConsts = {
  ATTEMPTS_COUNT,
  OTP_INPUT_LENGTH,
  declareErrorCodes,
  confirmErrorCodes,
  authLocalesEmail,
  registrationLocalesEmail,
};
