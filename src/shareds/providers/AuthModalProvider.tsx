import React, {
  createContext, useContext, useState, ReactNode, useMemo,
} from 'react';
import { CONFIRM_ATTEMPTS_COUNT, DECLARE_ATTEMPTS_COUNT } from '@/features/Auth/consts';

export type AuthModalType =
  | 'registration'
  | 'login'
  | 'otp'
  | 'information'
  | 'recovery'
  | 'password'
  | null;

export type AuthType = 'authConfirmationInfo' | 'registrationConfirmationInfo' | 'resetConfirmationInfo' | 'oneMinConfirmationInfo';

export interface ModalParams {
  isPhone?: boolean;
  login?: string;
  name?: string;
  password?: string;
  confirmCodeId?: string;
  isTooManyRequestsFor1Min?: boolean;
  isAttemptsEnabled?: boolean;
  isUserAlreadyRegistered?: boolean;
  type?: AuthType;
  confirmCodeValue?: string;
  attemptsDeclare?: number;
  attemptsConfirm?: number;
  declareError?: string;
  confirmError?: string;
  blockedTime?: string
  expiredTime?: string
}

const defaultModalParams: ModalParams = {
  confirmCodeId: '',
  confirmCodeValue: '',
  attemptsDeclare: DECLARE_ATTEMPTS_COUNT,
  attemptsConfirm: CONFIRM_ATTEMPTS_COUNT,
  declareError: '',
  confirmError: '',
};

type AuthModalContextType = {
  currentModal: AuthModalType;
  modalParams: ModalParams;
  openModal: (type: AuthModalType, params?: Omit<ModalParams, 'isPhone'>) => void;
  closeModal: () => void;
  updateModalParams: (params: ModalParams) => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentModal, setCurrentModal] = useState<AuthModalType>(null);
  const [modalParams, setModalParams] = useState<ModalParams>(defaultModalParams);

  const determineIsPhone = (login?: string): boolean => !!login && /^\d+$/.test(login);

  const openModal = (type: AuthModalType, params: Omit<ModalParams, 'isPhone'> = {}) => {
    const isPhone = determineIsPhone(params.login);
    setCurrentModal(type);
    setModalParams({ ...defaultModalParams, ...params, isPhone });
  };

  const closeModal = () => {
    setCurrentModal(null);
    setModalParams(defaultModalParams);
  };

  const updateModalParams = (params: ModalParams) => {
    setModalParams((prev) => ({
      ...prev,
      ...params,
    }));
  };

  const value = useMemo(() => ({
    currentModal,
    modalParams,
    openModal,
    closeModal,
    updateModalParams,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [currentModal, modalParams]);

  return (
    <AuthModalContext.Provider
      value={value}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};
