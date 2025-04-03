import { useState } from 'react';
import styled from 'styled-components';
import { Profile, AddPhoto } from '@/assets';

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 24px;
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
  border-radius: 50%;
  overflow: hidden;
`;

const StyledProfile = styled.div<{ image: string | null }>`
  width: 90px;
  height: 90px;
  background: ${({ image }) => (image ? `url(${image})` : 'none')} center/cover no-repeat;
  border-radius: 50%;
`;

const AddPhotoButton = styled.button`
  display: flex;
  width: 117px;
  padding: 2px 8px 2px 8px;
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
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('profile-upload')?.click();
  };

  return (
    <ProfileContainer>
      <Label>프로필 사진</Label>
      <ProfileWrapper>
        {image ? <StyledProfile image={image} /> : <Profile width='90px' height='90px' />}
      </ProfileWrapper>
      <input
        id='profile-upload'
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <AddPhotoButton onClick={handleButtonClick}>
        <AddPhoto width={14} height={14} /> 프로필 사진 추가
      </AddPhotoButton>
    </ProfileContainer>
  );
};

export default ProfileUpload;
