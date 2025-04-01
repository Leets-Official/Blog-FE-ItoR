import styled from "styled-components";
import Button from "./Button";

interface ActionButtonProps {
  type : 'blue' | 'gray';
  width?: string;
  height?: string;
}

const ActionButton = styled(Button) <ActionButtonProps>`
  border: 1px solid ${(props) => (props.type === "gray" ? "#909090" : "#00A1FF")};
  background-color: #FFFFFF;
  color: ${(props) => (props.type === "gray" ? "#909090" : "#00A1FF")};
  border-radius: 20px;
  font-size: 14px;
  width: ${(props) => props.width || "99px"};
  height: ${(props) => props.height || "38px"};
`;

export default ActionButton;