import Input from "./components/Input";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

function App() {

  return (
    <Container>
      <Input />
    </Container>
  )
}

export default App
