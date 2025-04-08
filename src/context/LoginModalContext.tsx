import { createContext, useContext, useState, ReactNode } from 'react';

interface LoginModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const LoginModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </LoginModalContext.Provider>
  );
};
export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) throw new Error('LoginModalContext는 provider 내에서만 사용할 수 있습니다.');
  return context;
};
