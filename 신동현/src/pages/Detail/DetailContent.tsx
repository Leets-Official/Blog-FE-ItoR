import styled from "styled-components";
import { Profile } from "@/assets";
import dayjs from "dayjs";
import Image from "@/components/ui/Image";
import WriterInfo from "@/components/layout/common/WriterInfo";
import { postContentAtom } from "@/Atoms/atoms";
import { useAtomValue } from "jotai";

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
  margin : 0;
`;

const Hr = styled.hr`
  width: 100%;
  border-width:1px 0 0 0;
  border-style:solid;
  border-color: #cccccc;
`;

const DetailContent = () => {
  const postContent = useAtomValue(postContentAtom);

  return (
    <ContentContainer>
      <ContentTitle>{postContent.title}</ContentTitle>
      <WriterInfo
        userProfileImage={postContent.profileUrl ? <Image src={postContent.profileUrl} alt="profile" width="20px" height="20px" style={{ borderRadius: "50%" }} /> : <Profile width="20px" height="20px" />}
        userName={postContent.nickName}
        writeDate={dayjs(postContent.createdAt).format("MMM DD.YYYY.").toString()}
        commentCount={postContent.comments.length}
      />
      <Hr />
      {postContent.contents.map((content) => 
        content.contentType === "TEXT" ? (
          <Content key={content.content}>{content.content}</Content>
        ) : (
          <Image 
            key={content.content} 
            src={content.content} 
            alt="image" 
            width="100%" 
            height="auto" 
            style={{ objectFit: 'contain' }}
          />
        )
      )}
    </ContentContainer>
  );
};

export default DetailContent;
