import {
  createContext, FC, PropsWithChildren, useContext, useMemo, useState,
} from 'react';
import { IVideoCardWithDetailsProps } from '@/entities/Video';

interface IModalState {
  onFinish?: () => void;
  onCancel?: () => void;
  videoData?: IVideoCardWithDetailsProps
}

interface IShareVideoModalContext {
  isModalOpen?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  modalState?: IModalState
  setModalState?: (state: IModalState) => void
}

interface IUseShareVideoModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalState?: IModalState
  setModalState: (state: IModalState) => void
}

const ShareVideoModalContext = createContext<IShareVideoModalContext>({});

export const ShareVideoModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
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

  const value: IUseShareVideoModal = useMemo(() => ({
    isModalOpen,
    openModal,
    closeModal,
    modalState,
    setModalState: setModalStateHandler,
  }), [isModalOpen, modalState]);

  return (
    <ShareVideoModalContext.Provider value={value}>
      {children}
    </ShareVideoModalContext.Provider>
  );
};

export const useShareVideoModal = (): IUseShareVideoModal => {
  const context = useContext(ShareVideoModalContext);

  if (!context) {
    throw new Error('useShareVideoModal must be used within an ShareVideoModal');
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
