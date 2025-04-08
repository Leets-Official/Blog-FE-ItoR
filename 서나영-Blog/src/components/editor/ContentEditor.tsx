import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  width: 100%;
  max-width: 688px;
  gap: 16px;
  margin: 0 auto 20px;
`;

const EditableArea = styled.div<{ $isEmpty: boolean }>`
  min-height: 400px;
  padding: 16px;
  font-size: 14px;
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
  onChange?: (value: string) => void;
}

const ContentEditor = ({ onChange }: ContentEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const updateIsEmpty = () => {
    const text = editorRef.current?.innerText || '';
    setIsEmpty(text.trim() === '');
    onChange?.(text);
  };

  return (
    <EditorContainer>
      <EditableArea
        contentEditable
        ref={editorRef}
        data-placeholder='어떠한 것을 깨달았나요?'
        $isEmpty={isEmpty}
        onInput={updateIsEmpty}
        // 텍스트 붙여넣기
        onPaste={(e) => {
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');

          // 현재 커서 위치
          const selection = window.getSelection();
          if (!selection?.rangeCount) return;

          selection.deleteFromDocument();
          selection.getRangeAt(0).insertNode(document.createTextNode(text));

          // 커서를 텍스트 뒤로 이동
          selection.collapseToEnd();
          updateIsEmpty();
        }}
      />
    </EditorContainer>
  );
};

export default ContentEditor;
