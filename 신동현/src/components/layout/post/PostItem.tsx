import styled from "styled-components";
import type { PostContent } from "../../../type/Post/Post";
import { Link } from "react-router-dom";

type PostItemProps = {
  post: PostContent;
};

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

  @media (max-width: 700px) {
    width: 90%;
  }  
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

const Hr = styled.hr`
  width: 100%;
  border-width:1px 0 0 0;
  border-style:solid;
  border-color: #cccccc;
`;


const PostItem = ({ post }: PostItemProps) => {
  return (
    <Wrapper>
      <Container>
        <ContentContainer>
          <PostInfoContainer>
            <PostContentContainer>
              <Link to={`/detail/${post.postId}`} style={{ textDecoration: "none" }}>
                <Title>{post.title}</Title>
              </Link>
              <PostContent>{post.contents[0].content}</PostContent>
            </PostContentContainer>
            <ImageContainer>
              {post.contents[0].contentType === "IMAGE" && <img src={post.contents[0].content} alt="post" />}
            </ImageContainer>
          </PostInfoContainer>
          {/* <WriterInfoContainer userProfileImage={post.userProfileImage} userName={post.userName} writeDate={dayjs(post.writeDate).format("MMM DD. YYYY.").toString()} commentCount={post.commentCount} /> */}
        </ContentContainer>
        <Hr />
      </Container>
    </Wrapper>
  );
}

export default PostItem;
