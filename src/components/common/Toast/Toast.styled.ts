import styled, { css } from 'styled-components';
import { ToastType } from './Toast';
import { flexAlignCenter } from '@/styles/common.styled';

const toastColor = {
  success: css`
    color: ${({ theme }) => theme.COLORS.positive};
    border: 1px solid ${({ theme }) => theme.COLORS.positive};
  `,
  error: css`
    color: ${({ theme }) => theme.COLORS.negative};
    border: 1px solid ${({ theme }) => theme.COLORS.negative};
  `,
};

export const ToastContainer = styled.div<{ type: ToastType }>`
  ${flexAlignCenter}
  gap:8px;
  position: fixed;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 25px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.COLORS.white};
  white-space: nowrap;
  z-index: 100;

  ${({ type }) => toastColor[type]}

  animation: fadeInOut 2.5s ease-in-out;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    10% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    90% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
  }
`;
