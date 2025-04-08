import styled from 'styled-components';
import { AddPhoto } from '@/assets';
import Button from '@/components/ui/Button';

const EditorHeaderWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 12px 16px 12px 12px;
  justify-content: center;
  align-items: center;
  z-index: 900;
  justify-content: center;
  align-self: stretch;

  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
`;

const StyledButton = styled(Button)`
  display: flex;
  padding: 2px 8px 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: none;
  color: #909090;
  font-size: 12px;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

interface EditorHeaderProps {
  onAddImage: (imageUrl: string) => void;
}

const EditorHeader = ({ onAddImage }: EditorHeaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onAddImage(url);
    }
  };

  return (
    <EditorHeaderWrapper>
      <label htmlFor='imageUpload'>
        <StyledButton as='span' type='None'>
          <AddPhoto width={16} height={16} fill='#909090' />
          사진 추가하기
        </StyledButton>
      </label>
      <HiddenInput type='file' id='imageUpload' accept='image/*' onChange={handleFileChange} />
    </EditorHeaderWrapper>
  );
};

export default EditorHeader;
