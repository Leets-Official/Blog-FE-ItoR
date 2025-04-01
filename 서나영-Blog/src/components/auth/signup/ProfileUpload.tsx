import styled from 'styled-components';
import { Profile, AddPhoto } from '@/assets';

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  color: #909090;
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
  letter-spacing: -0.07px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
`;

const AddPhotoButton = styled.button`
  display: flex;
  padding: 2px 8px 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
  font-size: 12px;
  font-weight: 400;
  line-height: 160%;
  color: #909090;
  background-color: #fff;
`;

const ProfileUpload = () => {
  return (
    <ProfileContainer>
      <Label>프로필 사진</Label>
      <ProfileWrapper>
        <Profile width='90px' height='90px' />
      </ProfileWrapper>
      <label htmlFor='profile-upload'>
        <AddPhotoButton>
          <AddPhoto width={14} height={14} /> 프로필 사진 추가
        </AddPhotoButton>
      </label>
    </ProfileContainer>
  );
};

export default ProfileUpload;
