import {
  createContext, FC, PropsWithChildren, useContext, useMemo, useState,
} from 'react';

interface IModalState {
  onFinish?: (newPlaylistId?: string, newPlaylistName?: string) => void;
  onCancel?: () => void;
}

interface ICreateUserPlaylistModalContext {
  isModalOpen?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  modalState?: IModalState
  setModalState?: (state: IModalState) => void
}

interface IUseCreateUserPlaylistModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalState?: IModalState
  setModalState: (state: IModalState) => void
}

const CreateUserPlaylistModalContext = createContext<ICreateUserPlaylistModalContext>({});

export const CreateUserPlaylistModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
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

  const value: ICreateUserPlaylistModalContext = useMemo(() => ({
    isModalOpen,
    openModal,
    closeModal,
    modalState,
    setModalState: setModalStateHandler,
  }), [isModalOpen, modalState]);

  return (
    <CreateUserPlaylistModalContext.Provider value={value}>
      {children}
    </CreateUserPlaylistModalContext.Provider>
  );
};

export const useCreateUserPlaylistModal = (): IUseCreateUserPlaylistModal => {
  const context = useContext(CreateUserPlaylistModalContext);

  if (!context) {
    throw new Error('useCreateUserPlaylistModal must be used within an CreateUserPlaylistModal');
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
