import styled from "styled-components";

export default function Button({ children, onClick, color, image }) {
  return <button onClick={onClick}>{children}</button>;
}
