import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Profile, AddPhoto } from '@/assets';
import { getPresignedUrl, uploadImage } from '@/api/image/ImageAPI';
import { useToast } from '@/components/ui/Toast';

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
`;

const ProfileWrapper = styled.div<{ size: number }>`
  display: flex;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const StyledProfile = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const AddPhotoButton = styled.button`
  display: flex;
  width: 120px;
  padding: 4px 8px 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #e6e6e6;
  font-size: 12px;
  color: #909090;
  background-color: #fff;
`;

interface ProfileUploadProps {
  initialImage?: string;
  onImageChange?: (imageUrl: string, file?: File) => void;
  hideButton?: boolean;
  size?: number;
  showLabel?: boolean;
}

const ProfileUpload = ({
  initialImage,
  onImageChange,
  hideButton,
  size = 90,
  showLabel = true,
}: ProfileUploadProps) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const { showToast } = useToast();

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const presignedUrl = await getPresignedUrl(file.name);
      const uploadedUrl = await uploadImage(presignedUrl, file);

      setImage(uploadedUrl);
      onImageChange?.(uploadedUrl, file);
    } catch (error) {
      showToast('이미지를 불러오지 못했습니다.', 'negative');
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('profile-upload')?.click();
  };

  return (
    <ProfileContainer>
      {showLabel && <Label>프로필 사진</Label>}
      <ProfileWrapper size={size}>
        {image ? (
          <StyledProfile src={image} size={size} onClick={handleButtonClick} />
        ) : (
          <Profile width={`${size}px`} height={`${size}px`} onClick={handleButtonClick} />
        )}
      </ProfileWrapper>
      <input
        id='profile-upload'
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      {!hideButton && (
        <AddPhotoButton onClick={handleButtonClick}>
          <AddPhoto width={14} height={14} /> 프로필 사진 추가
        </AddPhotoButton>
      )}
    </ProfileContainer>
  );
};

export default ProfileUpload;
