import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    width: string;
    height: string;
    fontSize: string;
    backgroundColor: string;
    color: string;
    hoverColor: string;
    hoverBackgroundColor: string;
}

const StyledButton = styled.button<{
    width: string;
    height: string;
    fontSize: string;
    color: string;
    backgroundColor: string;
    hoverColor: string;
    hoverBackgroundColor: string;
}>`
    cursor: pointer;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    background-color: ${(props) => props.backgroundColor};
    &:hover {
        color: ${(props) => props.hoverColor};
        background-color: ${(props) => props.hoverBackgroundColor};
    }
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
    hoverColor,
    hoverBackgroundColor,
    ...rest
}: ButtonProps) => {
    return (
        <StyledButton
            width={width}
            height={height}
            fontSize={fontSize}
            color={color}
            backgroundColor={backgroundColor}
            hoverColor={hoverColor}
            hoverBackgroundColor={hoverBackgroundColor}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </StyledButton>
    )
}

export default Button;
