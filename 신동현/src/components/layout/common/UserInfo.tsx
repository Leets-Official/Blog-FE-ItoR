import { Profile } from "@/assets";
import Image from "@/components/ui/Image";
import styled from "styled-components";

const ProfileImageContainer = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Nickname = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  margin: 0;
`;

const Bio = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #333333;
  margin: 0;
`;

interface UserInfoProps {
  userProfileImage: string;
  userName: string;
  userBio: string;
}

const UserInfo = ({ userProfileImage, userName, userBio }: UserInfoProps) => {
  return (
    <>
      <ProfileImageContainer>
        {userProfileImage ? (
          <Image
            src={userProfileImage}
            alt="profile"
            width="64px"
            height="64px"
            style={{ borderRadius: '50%' }}
          />
        ) : (
          <Profile width="64px" height="64px" />
        )}
      </ProfileImageContainer>
      <TextContainer>
        <Nickname>{userName}</Nickname>
        <Bio>{userBio}</Bio>
      </TextContainer>
    </>
  )
}

export default UserInfo;
