import { ReactNode, CSSProperties } from 'react';
import styled from 'styled-components';
import icons from '@/assets/index';

export type ButtonType = 'None' | 'Create';

interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  width?: string;
  height?: string;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '46px'};
  cursor: pointer;
  background-color: ${({ disabled }) => (disabled ? '#e6e6e6' : '#ffffff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Create = icons.Create;

const Button = ({ children, type = 'None', ...props }: ButtonProps) => {
  const icon =
    type === 'Create' ? (
      <IconWrapper>
        <img src={Create} alt='Create' width={24} height={24} />
      </IconWrapper>
    ) : null;

  return (
    <StyledButton {...props}>
      {icon}
      {children}
    </StyledButton>
  );
};

export default Button;
