import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal";
import { Chat } from "@/assets/index";
import LoginModal from "@/components/ui/LoginModal";
import Header from "@/components/layout/header/Header";
import Posts from "@/components/layout/post/Posts";
import DummyPostList from "@/components/layout/post/DummyPostList";

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

  const postList = DummyPostList({ postCount: 123 });

  return (
    <>
      <Header type="main" />

      <Posts postList={postList} />

      <Modal open={isModalOpen} title="가입되지 않은 계정이에요." subTitle="회원가입을 진행할까요?" onCancel={closeModal} onConfirm={() => { }} onClose={closeModal} cancelText="취소" confirmText="회원가입 하기" animation="fadeIn">
      </Modal>
      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
    </>

  )
}

export default Home
