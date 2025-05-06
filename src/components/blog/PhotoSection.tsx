import { PhotoSvg } from '@/assets';
import { Button } from '@/components';
import { ButtonWrapper } from '@/components/signup/SignupField';
import theme from '@/styles/theme.styled';
import { useRef } from 'react';

interface PhotoSectionProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ onImageChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
        onChange={onImageChange}
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
