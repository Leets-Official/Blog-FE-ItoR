import React, { createContext, useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import done from '@/assets/done.svg';
import error from '@/assets/error_outline.svg';
import PropTypes from 'prop-types';

const ToastContext = createContext();

// Fade In/Out 애니메이션
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const ToastWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px 0px 8px;
  gap: 4px;
  height: 40px;
  border-radius: 25px;
  border: 1px solid ${({ type }) => (type === 'positive' ? '#15DC5E' : '#FF3F3F')};
  background: #fff;
  color: ${({ type }) => (type === 'positive' ? '#15DC5E' : '#FF3F3F')};
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  animation: ${({ $isVisible }) => ($isVisible ? fadeIn : fadeOut)} 0.3s ease-in-out forwards;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

const ToastMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.07px;
`;

const Toast = () => {
  const { toast, isVisible } = useContext(ToastContext);

  return toast ? (
    <ToastWrapper type={toast.type} $isVisible={true}>
      <IconWrapper>
        <img
          src={toast.type === 'positive' ? done : error}
          alt={toast.type}
          width='24'
          height='24'
        />
      </IconWrapper>
      <ToastMessage>{toast.message}</ToastMessage>
    </ToastWrapper>
  ) : null;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });
    setIsVisible(true);

    /* 3초 후 isVisible을 false로 변경 -> fadeOut 실행 */
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  /* isVisible이 false가 된 후 0.3초 뒤에 toast 제거 */
  useEffect(() => {
    if (!isVisible && toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, toast]);

  return (
    <ToastContext.Provider value={{ showToast, toast, isVisible }}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

// PropTypes 설정
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => useContext(ToastContext);
