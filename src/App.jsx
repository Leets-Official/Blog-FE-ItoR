import Input from "./components/Input";
import Button from "./components/Button";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

function App() {

  return (
    <Container>
      <Input />
      <Button>버튼</Button>
    </Container>
  )
}

export default App;
