import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal";
import { Chat, Clear, Profile } from "@/assets/index";
import LoginModal from "@/components/ui/LoginModal";
import Header from "@/components/layout/header/Header";
import PostItem from "@/components/layout/post/PostItem";

const Home = () => {  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  }


  return (
    <>
      <Header type="main" />

      <div>
        <Button width="300px" height="45px" fontSize="16px" color="000000" backgroundColor="#FEE500" disabled={false} onClick={openLoginModal} icon={<Chat width="24px" height="24px" fill="#333333" />} style={{
          border: "none",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}>로그인 모달 열기</Button>
      </div >

      <div>
        <Button
          width="300px"
          height="45px"
          fontSize="16px"
          color="#FFFFFF"
          backgroundColor="#000000"
          onClick={openModal}
          disabled={false}
        >
          모달 열기
        </Button>
      </div>

      <hr />

      <PostItem title="16 Title one line" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." userProfileImage={<Profile/>} userName="닉네임" writeDate="Fed 17 2025" commentCount={0} postImage={<Profile/>} />

      <Clear />
      <Modal open={isModalOpen} title="가입되지 않은 계정이에요." subTitle="회원가입을 진행할까요?" onCancel={closeModal} onConfirm={() => { }} onClose={closeModal} cancelText="취소" confirmText="회원가입 하기" animation="fadeIn">
      </Modal>
      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
      
    </>

  )
}

export default Home
