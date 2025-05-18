import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const UserName = styled.p`
  font-size: 12px;
  margin: 0;
  color: #000000;
`;

const UserProfileImageContainer = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WriterInfoContent = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  color: #909090;
`;

interface WriterInfoContainerProps {
  userProfileImage?: React.ReactNode;
  userName: string;
  writeDate: string;
  commentCount: number;
}

const WriterInfo = ({ userProfileImage, userName, writeDate, commentCount }: WriterInfoContainerProps) => {
  return (
    <Wrapper>
      <Link to={`/mypage/${userName}`} style={{ textDecoration: "none", color: "inherit" }}>
        <UserInfoContainer>
          <UserProfileImageContainer>
            {userProfileImage}
          </UserProfileImageContainer>
          <UserName>{userName}</UserName>
        </UserInfoContainer>
      </Link>
      <WriterInfoContent> · {writeDate} · 댓글({commentCount})</WriterInfoContent>
    </Wrapper>
  );
};

export default WriterInfo;
