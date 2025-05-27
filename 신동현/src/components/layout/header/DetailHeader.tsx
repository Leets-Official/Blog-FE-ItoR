import { deletePost } from "@/api/post/post";
import { Chat, More_vert } from "@/assets";
import { isOwnerAtom } from "@/Atoms/atoms";
import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import Toast from "@/components/ui/Toast";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100px;
  width: 160px;
  gap: 8px;
  position: absolute;
  right: 0;
  top: 50px;
  flex-direction: column;
  padding-left: 8px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const OptionButton = styled(Button)`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  font-size: 14px;
  text-align: left;
  justify-content: flex-start;
  padding-left: 10px;
`;

const DetailHeader = () => {
  const isOwner = useAtomValue(isOwnerAtom);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const onDeletePost = async () => {
    const response = await deletePost(id as string);
    if (response.error) {
      setToast({ message: response.message, type: "error" });
    } else {
      setToast({ message: "블로그가 삭제되었습니다.", type: "success" });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    }
  }
  return (
    <Container>
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <Button
        width="40px"
        height="40px"
        fontSize="14px"
        color="#909090"
        backgroundColor="#FFFFFF"
        icon={<Chat width="24px" height="24px" fill="#333333" />}
        onClick={() => { }}
      >
      </Button>
      <Button
        width="40px"
        height="40px"
        fontSize="14px"
        color="#909090"
        backgroundColor="#FFFFFF"
        icon={<More_vert width="24px" height="24px" fill="#333333" />}
        onClick={() => {
          setIsOptionOpen(!isOptionOpen);
        }}
      >
      </Button>
      {isOwner && isOptionOpen && (
        <OptionContainer>
          <OptionButton
            color="#000000"
            onClick={() => {
              navigate(`/update/${id}`);
            }}
          >
            수정하기
          </OptionButton>
          <OptionButton
            color="#FF3F3F"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            삭제하기
          </OptionButton>
        </OptionContainer>
      )}
      <Modal open={isModalOpen} onClose={closeModal} title="해당 블로그를 삭제하시겠어요?" subTitle="삭제된 블로그는 다시 확인할 수 없어요." onCancel={closeModal} onConfirm={onDeletePost} cancelText="취소" confirmText="삭제하기" cancelType="default" confirmType="negative"/>
    </Container>
  );
};

export default DetailHeader;
