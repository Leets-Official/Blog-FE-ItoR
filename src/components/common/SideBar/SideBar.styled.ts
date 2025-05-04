import { flexCenter, flexColumn } from '@/styles/common.styled';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

export const SidebarWrapper = styled.div<{ isClosing: boolean }>`
  ${flexColumn}
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: ${({ theme }) => theme.COLORS.gray[96]};
  border-right: 1px solid ${({ theme }) => theme.COLORS.gray[90]};
  padding: 24px 16px;
  z-index: 1000;
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.3s ease forwards;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

export const Flex = styled.div`
  ${flexColumn};
  gap: 18px;
`;

export const FlexRow = styled.div`
  ${flexCenter};
  gap: 10px;
`;

export const SidebarContent = styled.div`
  ${flexColumn};
  gap: 28px;
`;
