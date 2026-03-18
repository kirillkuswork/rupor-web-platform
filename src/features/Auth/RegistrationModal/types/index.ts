import { CommonLanguageType } from '@/features/Auth/types';

export type RegistrationModalOnSubmitParams = {
  name: string;
  confirmCodeId: string;
  isTooManyRequestsFor1Min: boolean;
};

export type RegistrationModalProps = {
  title: string;
  confirmCodeId?: string;
  description: string;
  language: CommonLanguageType,
  submitButtonTitle: string;
  cancelButtonTitle: string;
  inputLabel: string;
  consentText: string;
  rulesTitle: string;
  rules: string[];
  login: string;
  name: string;
  isPhone: boolean;
  onSubmit: (params: RegistrationModalOnSubmitParams) => void;
  onCancel?: () => void;
  onClose: () => void;
};
