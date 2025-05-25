import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "@/components/ui/Modal/Modal";
import LoginModal from "@/components/ui/Modal/LoginModal";
import Posts from "@/components/layout/post/PostList";
import { getPostList } from "@/api/post/post";
import { useQuery } from "@tanstack/react-query";
import { PostListResponse } from "@/type/Post/Post";
import { postElementsAtom } from "@/Atoms/atoms";
import { useSetAtom } from "jotai";

const Home = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const setPostElements = useSetAtom(postElementsAtom);

  useEffect(() => {
    setPostElements([]);
  }, [setPostElements]);

  const queryKey = ['post'];
  const queryFn = () => getPostList(100, 0);
  const { data, isLoading, isError } = useQuery<PostListResponse>({ 
    queryKey, 
    queryFn
  });

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
  
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <>
      <Posts totalPostCount={data?.post.length as number} loadMyPage={false} />
      <Modal open={isModalOpen} title="가입되지 않은 계정이에요." subTitle="회원가입을 진행할까요?" onCancel={closeModal} onConfirm={() => { }} onClose={closeModal} cancelText="취소" confirmText="회원가입 하기" animation="fadeIn">
      </Modal>
      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  )
}

export default Home
