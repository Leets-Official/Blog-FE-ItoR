import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import DetailContent from "./DetailContent";
import DetailComment from "./DetailComment";
import DetailCommentInput from "./DetailCommentInput";
import { getPostDetail } from "@/api/post/post";
import Header from "@/components/layout/header/Header";
import UserInfo from "@/components/layout/common/UserInfo";
import { isOwnerAtom, postCommentAtom, postContentAtom } from "@/Atoms/atoms";
import { useAtom, useSetAtom } from "jotai";
import { PostContent } from "@/type/Post/Post";
import { useQuery } from "@tanstack/react-query";

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

const Detail = () => {
  const setIsOwner = useSetAtom(isOwnerAtom);
  const [postContent, setPostContent] = useAtom(postContentAtom);
  const setPostComment = useSetAtom(postCommentAtom);

  const { id } = useParams();

  const queryKey = ['postDetail', id];
  const queryFn = () => getPostDetail(id as string);

  const { data, isLoading, isError } = useQuery<PostContent>({
    queryKey,
    queryFn
  });
  
  useEffect(() => {
    if (!data) return;
    
    setPostComment(data.comments);
    setPostContent({
      postId: data.postId,
      title: data.title,
      contents: data.contents.map((content) => ({
        contentOrder: content.contentOrder,
        content: content.content,
        contentType: content.contentType,
      })),
      isOwner: data.isOwner,
      comments: data.comments,
      nickName: data.nickName,
      profileUrl: data.profileUrl,
      createdAt: data.createdAt,
    });
    setIsOwner(data.isOwner);
  }, [data]);

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  
  return (
    <>
      <Header type="detail"/>
      <Wrapper>
        <Container>
          <DetailContent/>
          <DetailComment/>
          <DetailCommentInput />
        </Container>
      </Wrapper>
      <Footer>
        <FooterContainer>
          <UserInfo
            userProfileImage={postContent.profileUrl}
            userName={postContent.nickName}
            userBio={"한 줄 소개"}
          />
        </FooterContainer>
      </Footer>
    </>
  )
}

export default Detail;
