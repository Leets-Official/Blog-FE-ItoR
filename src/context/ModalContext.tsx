import { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'login' | 'delete' | 'logout' | 'signup' | null;

interface ModalContextType {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  modalType: ModalType;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
  };
  const closeModal = () => {
    setModalType(null);
  };

  const isOpen = modalType !== null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalType, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('ModalContext는 provider 내에서만 사용할 수 있습니다.');
  return context;
};
