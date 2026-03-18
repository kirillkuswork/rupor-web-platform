import {
  createContext, FC, PropsWithChildren, useContext, useMemo, useState,
} from 'react';

type TReportModalTypes = 'videoComplain' | 'technicalComplain';

interface IModalState {
  onFinish?: () => void;
  onCancel?: () => void;
  videoId?: string
  modalType?: TReportModalTypes
}

interface IAddReportModalContext {
  isModalOpen?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  modalState?: IModalState
  setModalState?: (state: IModalState) => void
}

interface IUseAddReportModal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalState?: IModalState
  setModalState: (state: IModalState) => void
}

const AddReportModalContext = createContext<IAddReportModalContext>({});

export const AddReportModalContextProvider: FC<PropsWithChildren> = ({ children }) => {
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

  const value: IUseAddReportModal = useMemo(() => ({
    isModalOpen,
    openModal,
    closeModal,
    modalState,
    setModalState: setModalStateHandler,
  }), [isModalOpen, modalState]);

  return (
    <AddReportModalContext.Provider value={value}>
      {children}
    </AddReportModalContext.Provider>
  );
};

export const useAddReportModal = (): IUseAddReportModal => {
  const context = useContext(AddReportModalContext);

  if (!context) {
    throw new Error('useAddReportModal must be used within an AddReportModal');
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
