import styled from "styled-components";
import Button from "./Button";

interface SignButton {
  type?: 'email' | 'kakao';
  width?: string;
  height?: string;
  fontWeight?: string;
}

const SignButton = styled(Button) <SignButton>`
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "45px"};
  font-size: "15px";
  font-weight:${(props) => props.type == "email" ? "400" : "600"};
  color: ${(props) => props.type == "email" ? "#ffffff" : "#000000"};
  background-color: ${(props) => props.type == "email" ? "#00A1FF" : "#FEE500"};
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export default SignButton;