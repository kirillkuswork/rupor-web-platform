import { CommonCredentialServiceTypes } from '@/features/Auth/consts';
import { CommonLanguages } from '@/shareds/constants/languages';

export type CommonCredentialServiceType = typeof CommonCredentialServiceTypes[keyof typeof CommonCredentialServiceTypes];
export type CommonLanguageType = typeof CommonLanguages[keyof typeof CommonLanguages];

export type UseDeclareErrorCode = (
  | ''
  | 'registration.expired_code'
  | 'phone.too_many_requests_1_min'
  | 'phone.too_many_requests_1_hour'
  | 'credential.temporarily_blocked_1_hour'
  | 'email.validation_error'
  );

export type UseConfirmErrorCode = (
  | ''
  | 'confirm_code.invalid'
  | 'confirm_code.many_attempts'
  | 'confirm_code.attempts_limit_exceeded'
  | 'confirm_code.expired'
  );
