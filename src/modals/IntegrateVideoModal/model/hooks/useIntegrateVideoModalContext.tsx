import {
  createContext, FC, PropsWithChildren, useContext, useMemo, useState,
} from 'react';

interface IModalState {
  onFinish?: () => void;
  onCancel?: () => void;
}

interface IIntegrateVideoModalContext {
  isModalOpen?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  modalState?: IModalState
  setModalState?: (state: IModalState) => void
}

interface IUseIntegrateVideoModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalState?: IModalState
  setModalState: (state: IModalState) => void
}

const IntegrateVideoModalContext = createContext<IIntegrateVideoModalContext>({});

export const IntegrateVideoModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
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

  const value: IUseIntegrateVideoModal = useMemo(() => ({
    isModalOpen,
    openModal,
    closeModal,
    modalState,
    setModalState: setModalStateHandler,
  }), [isModalOpen, modalState]);

  return (
    <IntegrateVideoModalContext.Provider value={value}>
      {children}
    </IntegrateVideoModalContext.Provider>
  );
};

export const useIntegrateVideoModal = (): IUseIntegrateVideoModal => {
  const context = useContext(IntegrateVideoModalContext);

  if (!context) {
    throw new Error('useIntegrateVideoModal must be used within an IntegrateVideoModal');
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
