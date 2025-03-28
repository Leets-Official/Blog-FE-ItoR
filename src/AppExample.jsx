import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Image from '@/components/Image';
import image from '@/assets/test.jpg';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';
import CreateIcon from '@/assets/create.svg?react';
import KakaoIcon from '@/assets/kakaologo.svg?react';

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function AppExample() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  const InputFocus = () => {
    setToastShow(true);
    setTimeout(() => setToastShow(false), 2000);
  };

  return (
    <Container>
      <Input onFocus={InputFocus} placeholder='입력하세요' />
      <Button width='150px' color='#00A1FF' icon={CreateIcon}>
        깃로그 시작하기
      </Button>
      <Button width='150px' onClick={() => setModalOpen(true)} color='gray' bgColor='black'>
        모달창 띄우기
      </Button>
      <Button
        width='300px'
        height='50px'
        borderStyle='none'
        fontWeight='bold'
        bgColor='#FEE500'
        radius='6px'
        icon={KakaoIcon}
      >
        카카오로 로그인
      </Button>
      <Image src={image} alt='프로필' width='90px' height='90px' radius='50%' />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Toast show={toastShow} />
    </Container>
  );
}

export default AppExample;
