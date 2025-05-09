import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "@/components/ui/Modal/Modal";
import LoginModal from "@/components/ui/Modal/LoginModal";
import Posts from "@/components/layout/post/PostList";
import { getPostList } from "@/api/post/post";

const Home = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [totalPostCount, setTotalPostCount] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('type') === 'login') {
      setIsLoginModalOpen(true);
    }
  }, [location]);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  }

  const getTotalPage = async () => {
    try {
      const response = await getPostList(100, 0);
      setTotalPostCount(response.data.post.length);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTotalPage();
  }, []);
  
  return (
    <>
      <Posts totalPostCount={totalPostCount} />

      <Modal open={isModalOpen} title="가입되지 않은 계정이에요." subTitle="회원가입을 진행할까요?" onCancel={closeModal} onConfirm={() => { }} onClose={closeModal} cancelText="취소" confirmText="회원가입 하기" animation="fadeIn">
      </Modal>
      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  )
}

export default Home
