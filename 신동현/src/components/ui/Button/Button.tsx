import styled, { CSSProperties } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundColor?: string;
  color?: string;
  icon?: React.ReactNode;
  style?: CSSProperties;
}

const StyledButton = styled.button<{
  width?: string;
  height?: string;
  fontSize?: string;
  color?: string;
  $backgroundColor?: string;
  fontWeight?: string;
  disabled?: boolean;
}>`
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize || "15px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  color: ${(props) => props.color};
  background-color: ${(props) => props.$backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: ${(props) => props.disabled ? "default" : "pointer"};
`;

const IconContainer = styled.span`
  object-fit: contain;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Button = ({
  children,
  onClick,
  disabled,
  width,
  height,
  fontSize,
  backgroundColor,
  color,
  icon,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      width={width}
      height={height}
      fontSize={fontSize}
      color={color}
      $backgroundColor={backgroundColor}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <IconContainer>{icon}</IconContainer>}
      {children}
    </StyledButton>
  )
}

export default Button;