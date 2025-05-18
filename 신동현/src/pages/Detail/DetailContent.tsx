import styled from "styled-components";
import WriterInfoContainer from "@/components/layout/common/WriterInfoContainer";
import { Profile } from "@/assets";
import dayjs from "dayjs";
import { PostContent } from "@/assets/type/PostContent";
import Image from "@/components/ui/Image";
import { Link } from "react-router-dom";

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

const Hr = styled.hr`
  width: 100%;
  border-width:1px 0 0 0;
  border-style:solid;
  border-color: #cccccc;
`;

interface DetailContentProps {
  postContent: PostContent;
}

const DetailContent = ({ postContent }: DetailContentProps) => {

  return (
    <ContentContainer>
      <ContentTitle>{postContent.title}</ContentTitle>
      <Link to={`/mypage/${postContent.nickName}`} style={{ textDecoration: "none", color: "inherit" }}>
        <WriterInfoContainer
          userProfileImage={postContent.profileUrl ? <Image src={postContent.profileUrl} alt="profile" width="20px" height="20px" style={{ borderRadius: "50%" }} /> : <Profile width="20px" height="20px" />}
          userName={postContent.nickName}
          writeDate={dayjs(postContent.createdAt).format("MMM DD.YYYY.").toString()}
          commentCount={postContent.commentCount}
        />
      </Link>
      <Hr />
      <Content>{postContent.content}</Content>
    </ContentContainer>
  );
};

export default DetailContent;
