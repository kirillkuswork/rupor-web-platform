import { CommonLanguageType } from '@/features/Auth/types';

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

export type UseDeclare = (params: {
  login: string;
  name: string;
  isPhone: boolean;
  language: CommonLanguageType;
}) => {
  load: () => Promise<UseDeclareErrorCode>;
  isLoading: boolean;
};

export type UseConfirm = () => {
  load: (code: string) => Promise<UseConfirmErrorCode>;
  isLoading: boolean;
};

export type OTPWizardModalSubmitParams = {
  isAttemptsEnabled: boolean;
};

export type OTPModalProps = {
  title: string;
  description: string;
  informationText: string;
  login: string;
  name: string;
  isPhone: boolean;
  language: CommonLanguageType;
  confirmCodeId: string;
  onSubmit: (params: OTPWizardModalSubmitParams) => void;
  onCancel: () => void;
  onClose: () => void;
  useDeclare?: UseDeclare;
  useConfirm?: UseConfirm;
};
