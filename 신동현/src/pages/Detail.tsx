import Header from "@/components/layout/header/Header";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import CommentItem from "@/components/layout/comment/CommentItem";
import DummyCommentList from "@/components/layout/comment/DummyCommentList";
import SubmitButton from "@/components/ui/Button/SubmitButton";
import { Profile } from "@/assets";
import WriterInfoContainer from "@/components/layout/common/WriterInfoContainer";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 668px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  @media (max-width: 700px) {
    width: 90%;
  }  
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 50px 0; 
`;

const Content = styled.p`
  font-size: 14px;
  font-weight: 301;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentTitleContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CommentTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
`;

const Hr = styled.hr`
  width: 100%;
  border-width:1px 0 0 0;
  border-style:solid;
  border-color: #cccccc;
`;


const CommentCount = styled.p`
  font-size: 16px;
  color: #00A1FF;
`;

const CommentListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const CommentEmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CommentEmpty = styled.p`
  color: #C8C8C8;
  font-size: 14px;
  font-weight: 300;
  margin : 0;
`;

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

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F5F5F5;
`;

const FooterContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 50px 0;

  @media (max-width: 700px) {
    width: 90%;
  }  
`;

const WriterProfileImageContainer = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
`;

const WriterTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const WriterNickname = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  margin: 0;
`;

const WriterBio = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #333333;
  margin: 0;
`;


interface DetailProps {
  id: string;
  isLogin: boolean;
}

const Detail = ({ id, isLogin }: DetailProps) => {
  const [commentCount, setCommentCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(id);
  isLogin = false;
  const commentList = DummyCommentList({ commentCount });

  return (
    <>
      <Header type="detail" />
      <Wrapper>
        <Container>
          <ContentContainer>
            <ContentTitle>32 Title one line</ContentTitle>
            <WriterInfoContainer userProfileImage={<Profile width="20px" height="20px" />} userName="닉네임" writeDate={new Date()} commentCount={commentCount} />
            <Hr />
            <Content>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </Content>
          </ContentContainer>
          <CommentContainer>
            <CommentTitleContainer>
              <CommentTitle>댓글</CommentTitle>
              <CommentCount>{commentCount}</CommentCount>
            </CommentTitleContainer>
            {commentCount === 0 ? (
              <CommentEmptyContainer>
                <CommentEmpty>작성된 댓글이 없습니다.</CommentEmpty>
                <CommentEmpty>응원의 첫 번째 댓글을 달아주세요.</CommentEmpty>
              </CommentEmptyContainer>
            ) : (
              <CommentListContainer>
                {commentList.map((comment) => (
                  <CommentItem key={comment.id} profileImage={comment.profileImage} nickname={comment.nickname} date={comment.writeDate.toLocaleDateString()} content={comment.content} isMyComment={true} />
                ))}
              </CommentListContainer>
            )}
          </CommentContainer>
          <CommentInputContainer>
            {isLogin ? (
              <>
                <UserProfileContainer>
                  <UserProfileImageContainer>
                    <Profile width="20px" height="20px" />
                  </UserProfileImageContainer>
                  <UserProfileNickname>닉네임</UserProfileNickname>
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
        </Container>
      </Wrapper>
      <Footer>
        <FooterContainer>
          <WriterProfileImageContainer>
            <Profile width="64px" height="64px" />
          </WriterProfileImageContainer>
          <WriterTextContainer>
            <WriterNickname>닉네임</WriterNickname>
            <WriterBio>한 줄 소개</WriterBio>
          </WriterTextContainer>
        </FooterContainer>
      </Footer>
    </>
  )
}

export default Detail;
