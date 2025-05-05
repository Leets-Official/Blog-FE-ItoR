import { Profile } from "@/assets";
import SubmitButton from "@/components/ui/Button/SubmitButton";
import Image from "@/components/ui/Image";
import styled from "styled-components";

const UserProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-left: 20px;
`;

const UserProfileImageContainer = styled.div`
  width: 20px;
  height: 20px;
`;

const UserProfileNickname = styled.p`
  font-size: 14px;
  color: #000000;
`;

const CommentInputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #E6E6E6;  
`;

const SubmitButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 50px;
`;

const Textarea = styled.textarea`
  width: 622px;
  height: 106px;
  border: none;
  outline: none;
  resize: none;

  @media (max-width: 700px) {
    width: 90%;
  }  
`;

const DetailCommentInput = () => {
  const isLogin = localStorage.getItem("refreshToken") ? true : false;
  const nickName = localStorage.getItem("nickName");
  const profilePicture = localStorage.getItem("profilePicture");

  return (
    <CommentInputContainer>
    {isLogin ? (
      <>
        <UserProfileContainer>
          <UserProfileImageContainer>
            {profilePicture ? <Image src={profilePicture} alt="profile" width="20px" height="20px" style={{ borderRadius: "50%" }} /> : <Profile width="20px" height="20px" />}
          </UserProfileImageContainer>
          <UserProfileNickname>{nickName}</UserProfileNickname>
        </UserProfileContainer>
        <Textarea placeholder="댓글을 입력해주세요." value="" cols={15} rows={10} />
        <SubmitButtonContainer>
          <SubmitButton onClick={() => { }} >등록</SubmitButton>
        </SubmitButtonContainer>
      </>
    ) : (
      <Textarea placeholder="로그인을 하고 댓글을 달아보세요!" value="" cols={15} rows={8} style={{
        marginTop: "20px"
      }} />
    )}
  </CommentInputContainer>
  );
};

export default DetailCommentInput;
