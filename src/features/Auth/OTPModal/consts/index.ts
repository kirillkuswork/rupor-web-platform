import {
  UseConfirmErrorCode,
  UseDeclareErrorCode,
} from '../types';

export const OTP_INPUT_LENGTH = 4;

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
