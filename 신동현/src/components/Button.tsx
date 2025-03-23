import styled from "styled-components";

const StyledButton = styled.button<{
    width: string;
    height: string;
    fontSize: string;
    color: string;
    backgroundColor: string;
}>`
    cursor: pointer;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    background-color: ${(props) => props.backgroundColor};
`;


interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    width: string;
    height: string;
    fontSize: string;
    backgroundColor: string;
    color: string;
}

const Button = ({
    children,
    onClick,
    disabled,
    width,
    height,
    fontSize,
    backgroundColor,
    color,
    ...rest
}: ButtonProps) => {
    return (
        <StyledButton
            width={width}
            height={height}
            fontSize={fontSize}
            color={color}
            backgroundColor={backgroundColor}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}  
        </StyledButton>
    )
}

export default Button;
