import { deleteComment } from "@/api/post";
import { More_vert } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";
import Toast from "@/components/ui/Toast";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 668px;
  width: 100%;
  height: 100%;
`;

const WriteInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileContainer = styled.div`
  width: 20px;
  height: 20px;
`;

const RightContainer = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: column;
  align-items: flex-end;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-size: 14px;
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #909090;
`;

const CommentContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const CommentContentText = styled.p`
  width: 90%;
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  color: #333333;
`;


interface CommentItemProps {
  commentId: string;
  profileImage: React.ReactNode;
  nickname: string;
  date: string;
  content: string;
  isMyComment: boolean;
}

const CommentItem = ({ commentId, profileImage, nickname, date, content, isMyComment }: CommentItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null); 
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const onDeleteComment = async () => {
    const response = await deleteComment(commentId);
    if (response.error) {
      console.error(response.message);
    } else {
      setToast({ message: "삭제가 완료되었습니다!", type: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <Wrapper>
      {toast && <Toast key={toast.message} message={toast.message} type={toast.type} />}
      <WriteInfoContainer>
        <ProfileContainer>
          {profileImage}
        </ProfileContainer>
        <LeftContainer>
          <Nickname>{nickname}</Nickname>
          <Date>{date}</Date>
        </LeftContainer>
        <RightContainer>
          {isMyComment && (
            <Button
              width="40px"
              height="40px"
              fontSize="14px"
              color="#909090"
              backgroundColor="#FFFFFF"
              icon={<More_vert width="24px" height="24px" fill="#333333" />}
              onClick={openModal}
            />
          )}
        </RightContainer>
      </WriteInfoContainer>
      <CommentContent>
        <CommentContentText>{content}</CommentContentText>
      </CommentContent>
      <Modal open={isModalOpen} onClose={closeModal} title="댓글을 삭제할까요?" onCancel={closeModal} onConfirm={onDeleteComment} cancelText="취소" confirmText="삭제하기" cancelType="default" confirmType="negative" />
    </Wrapper>
  );
};

export default CommentItem;
