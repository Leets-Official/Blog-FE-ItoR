import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from '@/components/ui/Image';
import { Block } from '@/types/blogPost';

const EditorContainer = styled.div`
  width: 100%;
  max-width: 688px;
  gap: 16px;
  margin: 0 auto 20px;
  padding: 12px 16px;
`;

const EditableArea = styled.div<{ $isEmpty: boolean }>`
  min-height: ${({ $isEmpty }) => ($isEmpty ? '150px' : 'auto')};
  padding: 16px;
  font-size: 14px;
  font-family: 'Noto Sans L';
  line-height: 1.6;
  outline: none;
  white-space: pre-wrap;
  position: relative;

  &:empty::before {
    content: attr(data-placeholder);
    color: #ccc;
    pointer-events: none;
    position: absolute;
    left: 16px;
    top: 16px;
  }
`;

interface ContentEditorProps {
  onChange: (plainText: string, blocks: Block[]) => void;
  imageToInsert?: string | null;
  onImageInsertHandled?: () => void;
  initialBlocks?: Block[];
}

const ContentEditor = ({
  onChange,
  imageToInsert,
  onImageInsertHandled,
  initialBlocks,
}: ContentEditorProps) => {
  const [blocks, setBlocks] = useState<Block[]>([
    { type: 'TEXT', content: '' }, // 기본 텍스트 블록 하나
  ]);

  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 최초 렌더링 시 초기 블록 세팅
  useEffect(() => {
    if (initialBlocks && initialBlocks.length > 0) {
      setBlocks(initialBlocks);
    }
  }, [initialBlocks]);

  // 이미지 URL이 전달되면 blocks에 추가
  useEffect(() => {
    if (imageToInsert) {
      setBlocks((prev) => [
        ...prev,
        { type: 'IMAGE', content: imageToInsert },
        { type: 'TEXT', content: '' },
      ]);
      // 이미지 삽입 후 알림
      onImageInsertHandled?.();
    }
  }, [imageToInsert]);

  // blocks 변경 시 plain text 추출 및 전달
  useEffect(() => {
    const plainText = blocks
      .filter((b) => b.type === 'TEXT')
      .map((b) => b.content)
      .join('\n\n');
    onChange(plainText, blocks);
  }, [blocks]);

  // text 수정 핸들링
  const handleTextInput = (index: number, e: React.FormEvent<HTMLDivElement>) => {
    const updatedText = e.currentTarget.innerText;
    setBlocks((prevBlocks) =>
      prevBlocks.map((block, i) =>
        i === index && block.type === 'TEXT' ? { ...block, content: updatedText } : block,
      ),
    );
  };

  // text 붙여넣기 핸들링
  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');

    document.execCommand('insertText', false, pastedText);

    setTimeout(() => {
      const div = textRefs.current[index];
      if (div) {
        const updatedText = div.innerText;
        setBlocks((prevBlocks) =>
          prevBlocks.map((block, i) =>
            i === index && block.type === 'TEXT' ? { ...block, content: updatedText } : block,
          ),
        );
      }
    }, 0);
  };

  // 텍스트 초기 렌더 시 내부 내용만 DOM으로 채움 (커서 꼬임 방지)
  useEffect(() => {
    blocks.forEach((block, index) => {
      const div = textRefs.current[index];
      if (block.type === 'TEXT' && div && div.innerText !== block.content) {
        div.innerText = block.content;
      }
    });
  }, [blocks]);

  return (
    <EditorContainer>
      {blocks.map((block, index) =>
        block.type === 'TEXT' ? (
          <EditableArea
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            contentEditable
            suppressContentEditableWarning
            data-placeholder={index === 0 ? '어떠한 것을 깨달았나요?' : ''}
            onInput={(e) => handleTextInput(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            $isEmpty={!block.content}
          />
        ) : (
          <div key={index} style={{ margin: '24px 0' }}>
            <Image src={block.content} alt={`uploaded-${index}`} />
          </div>
        ),
      )}
    </EditorContainer>
  );
};

export default ContentEditor;
