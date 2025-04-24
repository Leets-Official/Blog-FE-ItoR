import styled from "styled-components";
import Button from "./Button";

const SubmitButton = styled(Button)`
  width: 64px;
  height: 38px;
  margin-left: auto;
  margin-bottom: 20px;
  border: 1px solid #E6E6E6;
  border-radius: 25px;
  background-color: #FFFFFF;
  color: #909090;
  &:hover {
    color: #FFFFFF;
    background-color: #111112;
  }
`;

export default SubmitButton;