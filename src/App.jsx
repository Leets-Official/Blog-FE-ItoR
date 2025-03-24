import Input from "./components/Input";
import Button from "./components/Button";
import Image from "./components/Image";
import styled from "styled-components";
import image from "./assets/test.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
`;

function App() {

  return (
    <Container>
      <Row>
        <Input placeholder="입력하세요" />
        <Button>버튼</Button>
      </Row>
      <Image src = {image} alt="Placeholder" radius={'50%'}/>
    </Container>
  )
}

export default App;
