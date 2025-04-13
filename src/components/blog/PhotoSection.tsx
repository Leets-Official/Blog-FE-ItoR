import { PhotoSvg } from '@/assets';
import { Button } from '@/components';
import { ButtonWrapper } from '../signup/SignupField';
import theme from '@/styles/theme.styled';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useRef } from 'react';

const PhotoSection: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, selectedFile, handleImageChange, reset } = useImageUpload();

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      <ButtonWrapper onClick={handleClick}>
        <Button
          variant="text"
          size="md"
          rounded="sm"
          height="25px"
          textColor={theme.COLORS.gray[56]}
        >
          <PhotoSvg />
          사진 추가하기
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default PhotoSection;
