import {
  createContext, FC, PropsWithChildren, useContext, useMemo, useState,
} from 'react';

export interface IDialogModalContent {
  title: string
  description: string
  buttonTitle: string
  dti?: string;
}

interface IModalState {
  onFinish?: () => void;
  onCancel?: () => void;
  modalContent?: IDialogModalContent
}

interface IDialogModalContext {
  isModalOpen?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  modalState?: IModalState
  setModalState?: (state: IModalState) => void
}

interface IUseDialogModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalState?: IModalState
  setModalState: (state: IModalState) => void
}

const DialogModalContext = createContext<IDialogModalContext>({});

export const DialogModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalState, setModalState] = useState<IModalState>({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalState({});
    setIsModalOpen(false);
  };

  const setModalStateHandler = (newState: IModalState) => {
    setModalState((prevState) => ({ ...prevState, ...newState }));
  };

  const value: IUseDialogModal = useMemo(() => ({
    isModalOpen,
    openModal,
    closeModal,
    modalState,
    setModalState: setModalStateHandler,
  }), [isModalOpen, modalState]);

  return (
    <DialogModalContext.Provider value={value}>
      {children}
    </DialogModalContext.Provider>
  );
};

export const useDialogModal = (): IUseDialogModal => {
  const context = useContext(DialogModalContext);

  if (!context) {
    throw new Error('useDialogModal must be used within an DialogModal');
  }

  const {
    isModalOpen,
    closeModal,
    modalState,
    setModalState,
    openModal,
  } = context;

  return {
    isModalOpen: isModalOpen!,
    closeModal: closeModal!,
    modalState,
    setModalState: setModalState!,
    openModal: openModal!,
  };
};
