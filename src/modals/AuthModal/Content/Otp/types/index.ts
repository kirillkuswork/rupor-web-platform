import { INewRegDeclareRequest } from '@/redux/services/auth/requestModel';

export type UseDeclareErrorCode = (
  | ''
  | 'registration.expired_code'
  | 'phone.too_many_requests_1_min'
  | 'phone.too_many_requests_1_hour'
  | 'credential.temporarily_blocked_1_hour'
  | 'email.validation_error'
  | 'phone.forbidden'
  | 'confirm_code.expired'
  | 'confirm_code.attempts_limit_exceeded'
  );

export type UseConfirmErrorCode = (
  | ''
  | 'confirm_code.forbidden'
  | 'confirm_code.many_attempts'
  | 'confirm_code.attempts_limit_exceeded'
  | 'confirm_code.expired'
  );

export type UseDeclare = (params: INewRegDeclareRequest) => {
  load: () => Promise<UseDeclareErrorCode>;
  isLoading: boolean;
};
