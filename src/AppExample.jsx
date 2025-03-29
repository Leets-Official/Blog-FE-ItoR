import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Image from '@/components/Image';
import image from '@/assets/test.jpg';
import { Modal, ModalText, ButtonContainer } from '@/components/Modal';
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
  const [toastData, setToastData] = useState({ show: false, type: 'error', message: '' });

  const InputFocus = (type) => {
    setToastData({
      show: true,
      type,
      message: type === 'positive' ? '저장되었습니다!' : '내용을 입력해주세요',
    });
    setTimeout(() => setToastData((prev) => ({ ...prev, show: false })), 2000);
  };

  return (
    <Container>
      <Input onFocus={() => InputFocus('error')} placeholder='입력하세요' />
      <Input
        onFocus={() => InputFocus('positive')}
        placeholder='입력하세요'
        borderStyle='1px solid black'
        bgColor='#E6E6E6'
      />
      <Button width='150px' color='#00A1FF' borderStyle='1px solid #00A1FF' icon={CreateIcon}>
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
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalText>
          <h4>해당 블로그를 삭제하시겠어요?</h4>
          <p>삭제된 블로그는 다시 확인할 수 없어요.</p>
        </ModalText>
        <ButtonContainer>
          <Button
            onClick={() => setModalOpen(false)}
            width='150px'
            borderStyle='1px solid #dfdada'
            radius='3px'
          >
            취소
          </Button>
          <Button width='150px' borderStyle='none' radius='3px' color='white' bgColor='#FF3F3F'>
            삭제하기
          </Button>
        </ButtonContainer>
      </Modal>
      ;
      <Toast show={toastData.show} type={toastData.type}>
        {toastData.message}
      </Toast>
    </Container>
  );
}

export default AppExample;
