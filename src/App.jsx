import React, { useState } from 'react';
import Input from "./components/Input";
import Button from "./components/Button";
import Image from "./components/Image";
import styled from "styled-components";
import image from "./assets/test.jpg";
import Modal from "./components/Modal";

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
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Container>
      <Row>
        <Input placeholder="입력하세요" />
        <Button width='200px' onClick={() => setModalOpen(true)}>버튼</Button>
      </Row>
      <Image src={image} alt="Placeholder" radius='50%' />
      <Modal Open={modalOpen} Close={() => setModalOpen(false)} />
    </Container>
  );
}

export default App;
