import styled, { css, CSSProperties } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  disabled ?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  backgroundcolor?: string;
  color?: string;
  icon?: React.ReactNode;
  style?: CSSProperties;
}

const StyledButton = styled.button<{
  width?: string;
  height?: string;
  fontSize?: string;
  color?: string;
  backgroundcolor?: string;
}>`
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundcolor};
`;

const IconContainer = styled.span`
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
  backgroundcolor,
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
      backgroundcolor={backgroundcolor}
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
