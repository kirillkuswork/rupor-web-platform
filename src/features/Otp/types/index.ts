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
  | 'confirm_code.forbidden'
  );

export interface BackendError {
  code: string;
  message: string;
  httpStatusCode: number;
}

export type UseDeclare<T> = (params: T) => {
  load: () => Promise<UseDeclareErrorCode>;
  isLoading: boolean;
};
