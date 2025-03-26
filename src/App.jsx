import React, { useState } from 'react';
import styled from "styled-components";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "@/components/Image";
import image from "@/assets/test.jpg";
import Modal from "@/components/Modal";
import Toast from '@/components/Toast';

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
  const [toastShow, setToastShow] = useState(false);

  const InputFocus = () => {
    setToastShow(true);
    setTimeout(() => setToastShow(false), 2000); 
  };

  return (
    <Container>
      <Row>
        <Input onFocus={InputFocus} placeholder="입력하세요" />
        <Button width='200px' onClick={() => setModalOpen(true)}>버튼</Button>
      </Row>
      <Image src={image} alt="Placeholder" radius='50%' />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Toast show={toastShow} />
    </Container>
  );
}

export default App;
