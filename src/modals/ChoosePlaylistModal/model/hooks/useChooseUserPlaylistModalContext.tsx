import {
  createContext, FC, PropsWithChildren, useContext, useMemo, useState,
} from 'react';

interface IModalState {
  onFinish?: (playlistId?:string, playlistName?: string) => void;
  onCancel?: () => void;
}

type TModalType = 'save' | 'move';

interface IChooseUserPlaylistModalContext {
  isModalOpen?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  modalState?: IModalState
  setModalState?: (state: IModalState) => void
  type?: TModalType;
  setType?: (arg: TModalType) => void;
}

interface IUseChooseUserPlaylistModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalState?: IModalState
  setModalState: (state: IModalState) => void
  type?: TModalType;
  setType: (arg: TModalType) => void;
}

const ChooseUserPlaylistModalContext = createContext<IChooseUserPlaylistModalContext>({});

export const ChooseUserPlaylistModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Добавил для разделения модалок на сохранение и перемещение в другой плейлист
  const [type, setType] = useState<'save' | 'move'>('save');

  const [modalState, setModalState] = useState<IModalState>({});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalState({});
    setIsModalOpen(false);
    setType('save');
  };

  const setModalStateHandler = (newState: IModalState) => {
    setModalState((prevState) => ({ ...prevState, ...newState }));
  };

  const value: IUseChooseUserPlaylistModal = useMemo(() => ({
    isModalOpen,
    openModal,
    closeModal,
    modalState,
    setModalState: setModalStateHandler,
    type,
    setType,
  }), [isModalOpen, modalState, type]);

  return (
    <ChooseUserPlaylistModalContext.Provider value={value}>
      {children}
    </ChooseUserPlaylistModalContext.Provider>
  );
};

export const useChooseUserPlaylistModal = (): IUseChooseUserPlaylistModal => {
  const context = useContext(ChooseUserPlaylistModalContext);

  if (!context) {
    throw new Error('useChooseUserPlaylistModal must be used within an ChooseUserPlaylistModal');
  }

  const {
    isModalOpen,
    closeModal,
    modalState,
    setModalState,
    openModal,
    type,
    setType,
  } = context;

  return {
    isModalOpen: isModalOpen!,
    closeModal: closeModal!,
    modalState,
    setModalState: setModalState!,
    openModal: openModal!,
    type: type!,
    setType: setType!,
  };
};
