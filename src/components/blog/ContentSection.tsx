import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { DeleteSvg, PhotoSvg } from '@/assets';
import { Textarea, Image, Button } from '@/components';
import { useImageUpload } from '@/hooks/useImageUpload';
import theme from '@/styles/theme.styled';
import { flexCenter } from '@/styles/common.styled';

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const BlockWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: -72px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const PhotoButton = styled.div`
  ${flexCenter}
  margin-bottom: 16px;
`;

interface ContentBlock {
  id: number;
  type: 'text' | 'image';
  value: string;
  url?: string;
  isActive?: boolean;
}

const ContentSection: React.FC = () => {
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: Date.now(),
      type: 'text',
      value: '',
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const { handleImageChange } = useImageUpload();

  const handleTextChange = (id: number, value: string) => {
    setContentBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, value } : block)),
    );
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e);
    if (!e.target.files?.[0]) return;
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    const now = Date.now();
    const newImageBlock: ContentBlock = {
      id: now,
      type: 'image',
      value: '',
      url: fileUrl,
    };
    const textBlockAfter: ContentBlock = {
      id: now + 1,
      type: 'text',
      value: '',
    };
    setContentBlocks((prev) => [...prev, newImageBlock, textBlockAfter]);
  };

  const handleRemoveBlock = (id: number) => {
    setContentBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const triggerImageUpload = () => {
    inputRef.current?.click();
  };

  const handleImageClick = (id: number) => {
    setContentBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, isActive: !block.isActive } : { ...block, isActive: false },
      ),
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.image-block')) {
        setContentBlocks((prev) =>
          prev.map((block) =>
            block.type === 'image' && block.isActive ? { ...block, isActive: false } : block,
          ),
        );
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <SectionWrapper>
      <PhotoButton>
        <Button
          variant="text"
          size="md"
          rounded="sm"
          height="25px"
          textColor={theme.COLORS.gray[56]}
          onClick={triggerImageUpload}
        >
          <PhotoSvg />
          사진 추가하기
        </Button>
      </PhotoButton>

      <Textarea
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        rows={1}
        inputSize="xl"
        inputWeight="medium"
        placeholderColor="gray56"
        placeholderSize="md"
        placeholderWeight="medium"
        hasBorder={false}
      />

      {contentBlocks.map((block) => (
        <BlockWrapper key={block.id} className={block.type === 'image' ? 'image-block' : ''}>
          {block.type === 'text' ? (
            <Textarea
              placeholder="어떠한 것을 깨달았나요?"
              value={block.value}
              onChange={(e) => handleTextChange(block.id, e.target.value)}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
              inputSize="sm"
              inputWeight="light"
              placeholderColor="gray56"
              placeholderSize="sm"
              placeholderWeight="regular"
              hasBorder={false}
              rows={6}
            />
          ) : (
            <>
              <Image
                src={block.url || ''}
                alt="upload-preview"
                width="100%"
                height="auto"
                objectFit="cover"
                borderRadius="8px"
                style={{
                  border: block.isActive ? '2px solid #00a1ff' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => handleImageClick(block.id)}
              />
              {block.isActive && (
                <DeleteButton onClick={() => handleRemoveBlock(block.id)}>
                  <DeleteSvg />
                </DeleteButton>
              )}
            </>
          )}
        </BlockWrapper>
      ))}

      <input
        type="file"
        accept="image/*"
        onChange={handleAddImage}
        ref={inputRef}
        style={{ display: 'none' }}
        id="imageUpload"
      />
    </SectionWrapper>
  );
};

export default ContentSection;
