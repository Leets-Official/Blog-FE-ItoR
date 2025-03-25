import styled from 'styled-components';
import {
  ButtonRounded,
  ButtonSize,
  ButtonVariant,
  roundedStyles,
  sizeStyles,
  variantStyles,
} from '@/components/common/Button/Button.styled';
import { flexCenter } from '@/styles/common.styled';
import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  ${flexCenter}
  gap:8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};

  ${({ variant }) => variant && variantStyles[variant]};
  ${({ size }) => size && sizeStyles[size]};
  ${({ rounded }) => rounded && roundedStyles[rounded]};
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', rounded = 'md', fullWidth = false, children, ...rest },
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        rounded={rounded}
        fullWidth={fullWidth}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
