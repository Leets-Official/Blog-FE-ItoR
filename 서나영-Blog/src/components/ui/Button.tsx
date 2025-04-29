import { ReactNode, CSSProperties } from 'react';
import styled from 'styled-components';
import { Create } from '@/assets';

export type ButtonType = 'None' | 'Create' | 'Submit';

interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  width?: string;
  height?: string;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  iconFill?: string;
  buttonType?: 'button' | 'submit';
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '46px'};
  background-color: ${({ disabled }) => (disabled ? '#e6e6e6' : '#ffffff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${({ type }) =>
    type === 'Create' &&
    `
      font-size: 14px;
    `}

  ${({ type }) =>
    type === 'Submit' &&
    `
      background-color: #FFF;
      color: #00A1FF;
    `}
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = ({
  children,
  type = 'None',
  iconFill = '#00A1FF',
  onClick,
  buttonType = 'button',
  ...props
}: ButtonProps) => {
  const icon =
    type === 'Create' ? (
      <IconWrapper>
        <Create width={24} height={24} fill={iconFill} />
      </IconWrapper>
    ) : null;

  return (
    <StyledButton {...props} onClick={onClick}>
      {icon}
      {children}
    </StyledButton>
  );
};

export default Button;
