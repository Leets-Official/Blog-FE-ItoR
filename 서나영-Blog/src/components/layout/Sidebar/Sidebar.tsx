import { useEffect, useState } from 'react';
import LoginSide from './LoginSide';
import LogoutSide from './LogoutSide';
import styled from 'styled-components';

interface SideProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const SideContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 240px;
  height: 100vh;
  background-color: #f5f5f5;
  border-right: 1px solid #e6e6e6;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease-in-out;
  z-index: 2000;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const Sidebar = ({ isOpen, onClose, onLogout }: SideProps) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLogin(!!token);
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).id === 'sidebar-overlay') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  return (
    <>
      <Overlay id='sidebar-overlay' $isOpen={isOpen} />
      <SideContainer $isOpen={isOpen}>
        {isLogin ? <LoginSide onLogout={onLogout} /> : <LogoutSide onLoginSuccess={onClose} />}
      </SideContainer>
    </>
  );
};

export default Sidebar;
