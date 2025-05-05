import Header from "@/components/layout/header/Header";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { Profile } from "@/assets";
import DetailContent from "./DetailContent";
import DetailComment from "./DetailComment";
import DetailCommentInput from "./DetailCommentInput";

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

const Detail = () => {
  const [commentCount, setCommentCount] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  
  const isLogin = false;
  return (
    <>
      <Wrapper>
        <Container>
          <DetailContent commentCount={commentCount} />
          <DetailComment commentCount={commentCount} />
          <DetailCommentInput isLogin={isLogin} />
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
