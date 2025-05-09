import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Profile } from "@/assets";
import DetailContent from "./DetailContent";
import DetailComment from "./DetailComment";
import DetailCommentInput from "./DetailCommentInput";
import { getPostDetail } from "@/api/post/post";
import Image from "@/components/ui/Image";
import { PostContent } from "@/assets/type/PostContent";
import { PostComment } from "@/assets/type/PostCommnet";
import Header from "@/components/layout/header/Header";

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
  const [isOwner, setIsOwner] = useState(false);
  const [postContent, setPostContent] = useState<PostContent>({
    title: "",
    contentOrder: 0,
    content: "",
    contentType: "",
    nickName: "",
    profileUrl: "",
    createdAt: "",
    commentCount: 0,
  });
  const [postComment, setPostComment] = useState<PostComment[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) return;
      try {
        const response = await getPostDetail(id);
        if (response.code === 200) {
          const data = response.data;
          setPostComment(data.comments);
          setPostContent({
            title: data.title,
            contentOrder: data.contents[0].contentOrder,
            content: data.contents[0].content,
            contentType: data.contents[0].contentType,
            nickName: data.nickName,
            profileUrl: data.profileUrl,
            createdAt: data.createdAt,
            commentCount: data.commentCount,
          });
          setIsOwner(response.data.isOwner);
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchBlogDetail();
  }, []);

  return (
    <>
      <Header type="detail" isOwner={isOwner} />
      <Wrapper>
        <Container>
          <DetailContent postContent={postContent} />
          <DetailComment postComment={postComment} />
          <DetailCommentInput />
        </Container>
      </Wrapper>
      <Footer>
        <FooterContainer>
          <WriterProfileImageContainer>
            {postContent.profileUrl ? <Image src={postContent.profileUrl} alt="profile" width="64px" height="64px" style={{ borderRadius: "50%" }} /> : <Profile width="64px" height="64px" />}
          </WriterProfileImageContainer>
          <WriterTextContainer>
            <WriterNickname>{postContent.nickName}</WriterNickname>
            {/* <WriterBio>한 줄 소개</WriterBio> */}
          </WriterTextContainer>
        </FooterContainer>
      </Footer>
    </>
  )
}

export default Detail;
