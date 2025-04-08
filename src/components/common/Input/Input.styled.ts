import { flexAlignCenter, flexColumn } from '@/styles/common.styled';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  ${flexColumn}
  gap:16px;
  width: 100%;
`;

export const InputBox = styled.div`
  position: relative;
  width: 100%;
`;

export const IconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  ${flexAlignCenter}
`;

export const Label = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.COLORS.gray[56]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
`;

export const StyledInput = styled.input<{
  textColor?: string;
  borderColor?: string;
  hasIcon?: boolean;
  showBorder?: boolean;
}>`
  ${flexAlignCenter}
  width:100%;
  border-radius: 4px;
  padding: 12px 16px;
  padding-left: ${({ hasIcon }) => (hasIcon ? '40px' : '16px')};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  line-height: 1.6;
  letter-spacing: 0.2px;
  resize: none;

  color: ${({ textColor, readOnly, theme }) =>
    textColor ?? (readOnly ? theme.COLORS.gray[56] : theme.COLORS.black)};

  border: ${({ theme, readOnly, showBorder }) =>
    !showBorder || readOnly ? 'none' : `1px solid ${theme.COLORS.gray[78]}`};

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.COLORS.gray[56]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.gray[78]};
  }

  ${({ readOnly }) =>
    readOnly &&
    `
      cursor: not-allowed;
      pointer-events: none;
    `}

  background-color: ${({ readOnly, theme }) =>
    readOnly ? theme.COLORS.gray[90] : theme.COLORS.white};
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  color: ${({ theme }) => theme.COLORS.negative};
`;
