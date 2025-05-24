import { Draggable } from "@hello-pangea/dnd";
import { Post, postElementsAtom } from "@/Atoms/atoms";
import { useSetAtom } from "jotai";
import styled from "styled-components";
import React, { useEffect, useRef } from "react";

const MoveButton = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: -30px;
  opacity: 0;
  transition: opacity 0.2s ease;
  cursor: grab;
`;

const PostContent = styled.div`
  width: 100%;
  height: 100%;
  white-space: pre-wrap;
  word-break: break-all;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  position: relative;

  &:hover ${MoveButton} {
    opacity: 1;
  }
`;

const PostDraggable = ({ index, element, isNew }: { index: number, element: Post, isNew?: boolean }) => {
  const setPostElements = useSetAtom(postElementsAtom);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNew && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isNew]);

  const UpdatePostElement = (text: string) => {
    setPostElements(prev => {
      const newContent: Post = {
        type: "paragraph",
        children: [{ text: text }],
      };
      prev.splice(index, 1);
      prev.splice(index, 0, newContent);
      return prev;
    });
  }

  const handleDelete = () => {
    setPostElements(prev => prev.filter((_, i) => i !== index));
  }

  const handleBlur = () => {
    if (contentRef.current && contentRef.current.textContent?.trim() === '') {
      handleDelete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace' && contentRef.current?.textContent?.trim() === '') {
      e.preventDefault();
      handleDelete();
    }

    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const currentText = contentRef.current?.innerHTML
        .replace(/<div>/g, '\n')
        .replace(/<\/div>/g, '')
        .replace(/<br>/g, '\n') || '';
      const cursorPosition = window.getSelection()?.anchorOffset || 0;
      
      // 현재 텍스트를 커서 위치 기준으로 분할
      const beforeCursorContent = currentText.slice(0, cursorPosition);
      console.log(currentText, beforeCursorContent);
      UpdatePostElement(currentText);

      // 새 요소 추가
      setPostElements(prev => [...prev, { type: "paragraph", children: [{ text: "" }] }]);

      // 다음 요소에 포커스
      setTimeout(() => {
        const nextElement = document.querySelector(`[data-index="${index + 1}"]`);
        if (nextElement instanceof HTMLElement) {
          nextElement.focus();
        }
      }, 0);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    UpdatePostElement(e.target.innerText);
  };

  return (
    <Draggable draggableId={`post-${index}`} index={index}>
      {(provided) => (
        <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
          {element.type === "paragraph" ? (
            <PostContent
              ref={contentRef}
              contentEditable={true}
              suppressContentEditableWarning
              onBlur={handleBlur}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
            >
              {element.children[0].text}
            </PostContent>
          ) : (
            <div>Image</div>
          )}
          <MoveButton {...provided.dragHandleProps}>::</MoveButton>
        </Wrapper>
      )}
    </Draggable>
  )
}

export default React.memo(PostDraggable);
