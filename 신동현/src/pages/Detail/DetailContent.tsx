import styled from "styled-components";
import WriterInfoContainer from "@/components/layout/common/WriterInfoContainer";
import { Profile } from "@/assets";

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

interface DetailContentContainerProps {
  commentCount: number;
}

const DetailContent = ({ commentCount }: DetailContentContainerProps) => {
  return (
    <ContentContainer>
      <ContentTitle>32 Title one line</ContentTitle>
      <WriterInfoContainer userProfileImage={<Profile width="20px" height="20px" />} userName="닉네임" writeDate={new Date()} commentCount={commentCount} />
      <Hr />
      <Content>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </Content>
    </ContentContainer>
  );
};

export default DetailContent;
