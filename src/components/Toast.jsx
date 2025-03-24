import React from 'react';
import styled from 'styled-components';

const ToastMessage = styled.div`
  position: absolute;
  bottom: 50px;
  background: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${(props) => (props.$show ? '1' : '0')};
  transition: opacity 0.5s;
`;

const Toast = ({ show }) => {
  return <ToastMessage $show={show}>입력하시오</ToastMessage>;
};

export default Toast;