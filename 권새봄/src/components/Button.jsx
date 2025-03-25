import styled from "styled-components";
import theme from "../styles/theme";

export default function Button({ children, onClick, ...props }) {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  font-size: ${(props) => props.fontSize || "14px"};
  background-color: ${(props) => props.background || "transparent"};
  color: ${({ color }) => color || theme.colors.gray50};
  border: 1px solid;
  border-color: ${({ color }) => color || theme.colors.gray50};
  padding: 8px 12px;
  border-radius: 25px;

  cursor: pointer;
`;
