import React, {
  createContext, useContext, useState, ReactNode, useMemo,
} from 'react';
import { CONFIRM_ATTEMPTS_COUNT, DECLARE_ATTEMPTS_COUNT } from '@/features/Auth/consts';

export type SettingsModalType =
  | 'password'
  | 'otp'
  | 'email'
  | 'information'
  | 'avatar'
  | null;

export type SettingsType = 'emailType' | 'passwordType';

export interface ModalParams {
  login?: string;
  name?: string;
  password?: string;
  confirmCodeId?: string;
  isTooManyRequestsFor1Min?: boolean;
  isAttemptsEnabled?: boolean;
  isUserAlreadyRegistered?: boolean;
  type?: SettingsType;
  confirmCodeValue?: string;
  attemptsDeclare?: number;
  attemptsConfirm?: number;
  declareError?: string;
  confirmError?: string;
  blockedTime?: string
  fileUrl?: string;
  avatarFileId?: string;
  expiredTime?: string;
}

const defaultModalParams: ModalParams = {
  confirmCodeId: '',
  confirmCodeValue: '',
  attemptsDeclare: DECLARE_ATTEMPTS_COUNT,
  attemptsConfirm: CONFIRM_ATTEMPTS_COUNT,
  declareError: '',
  confirmError: '',
  fileUrl: '',
  avatarFileId: '',
};

type SettingsContextType = {
  currentModal: SettingsModalType;
  modalParams: ModalParams;
  openModal: (type: SettingsModalType, params?: ModalParams) => void;
  closeModal: () => void;
  updateModalParams: (params: ModalParams) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentModal, setCurrentModal] = useState<SettingsModalType>(null);
  const [modalParams, setModalParams] = useState<ModalParams>(defaultModalParams);

  const openModal = (type: SettingsModalType, params: ModalParams = {}) => {
    setCurrentModal(type);
    setModalParams({ ...defaultModalParams, ...params });
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
  }), [currentModal, modalParams]);

  return (
    <SettingsContext.Provider
      value={value}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsModal = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsModal must be used within an SettingsModalProvider');
  }
  return context;
};
