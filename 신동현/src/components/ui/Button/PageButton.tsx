import styled from "styled-components";
import Button from "./Button";

const PageButton = styled(Button) <{
  type: "current" | "active" | "inactive";
}>`
  width: 32px;
  height: 32px;
  background-color: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: #000000;
  }
  ${({ type }) => type === "current" && `
    color: #1890FF;
    border: 1px solid #1890FF;
  `}
  ${({ type }) => type === "inactive" && `
    cursor: default;
    svg {
      fill: #D9D9D9;
    }
  `}
  ${({ type }) => type === "active" && `
    &:hover {
      color: #1890FF;
      border: 1px solid #1890FF;
      svg {
        fill: #1890FF;
      }
    }
  `}
`;

export default PageButton;
