import styled from "styled-components";
import { Post } from "./Post";
import { Profile } from "@/assets";
import { ReactNode } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 92px;
  height: 92px;
  margin: 10px;
`;

const PostInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const PostContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PostWriteInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0px;
  color: #000000;
`;

const PostContent = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  color: #555555;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UserName = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  color: #000000;
`;

const UserProfileImageContainer = styled.div`
  width: 16px;
  height: 16px;
`;

const WriteInfoContent = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  color: #909090;
`;

const Hr = styled.hr`
  width: 100%;
  border-width:1px 0 0 0;
  border-style:solid;
  border-color: #cccccc;
`;

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Wrapper>
      <Container>
        <ContentContainer>
          <PostInfoContainer>
            <PostContentContainer>
              <Title>{post.title}</Title>
              <PostContent>{post.content}</PostContent>
            </PostContentContainer>
            <ImageContainer>
              {post.postImage}
            </ImageContainer>
          </PostInfoContainer>
          <PostWriteInfoContainer>
            <UserInfoContainer>
              <UserProfileImageContainer>
                {post.userProfileImage}
              </UserProfileImageContainer>
              <UserName>{post.userName}</UserName>
            </UserInfoContainer>
            <WriteInfoContent> · {post.writeDate.toLocaleDateString()} · 댓글({post.commentCount})</WriteInfoContent>
          </PostWriteInfoContainer>
        </ContentContainer>
        <Hr />
      </Container>
    </Wrapper>
  );
};

export default PostItem;
