import { postElementsAtom } from "@/Atoms/atoms";
import { Droppable } from "@hello-pangea/dnd";
import { DragDropContext } from "@hello-pangea/dnd";
import { DropResult } from "@hello-pangea/dnd";
import { useAtom } from "jotai";
import styled from "styled-components";
import PostDraggable from "./PostDraggable";
import Button from "@/components/ui/Button/Button";

const InputPlaceHolder = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  margin: 0px 23px;
  color: #909090;
`;

const InputContainer = styled.div`
  width: 622px;
  margin: 0px 23px;
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const PostBoard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PostEditor = () => {
  const [postElements, setPostElements] = useAtom(postElementsAtom);

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    setPostElements(prev => {
      const postCopy = [...prev];
      const taskObj = postCopy[source.index];
      postCopy.splice(source.index, 1);
      postCopy.splice(destination.index, 0, taskObj);
      return postCopy
    });
  }

  const addPostElement = () => {
    setPostElements([...postElements, { type: "paragraph", content: "" }]);
  }

  return (
    <>
      {postElements.length > 0 ? (
        <InputContainer>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <PostBoard ref={provided.innerRef} {...provided.droppableProps}>
                  {postElements.map((element, index) => (
                    <PostDraggable key={index} index={index} element={element} isNew={index === postElements.length - 1} />
                  ))}
                  {provided.placeholder}
                </PostBoard>
              )}
            </Droppable>
          </DragDropContext>
          <Button onClick={addPostElement} width="100%" height="25px" backgroundColor="#FFFFFF" />
        </InputContainer>
      ) : (
        <>
          <InputPlaceHolder onClick={addPostElement}>어떠한 것을 깨달았나요?</InputPlaceHolder>
        </>
      )}
    </>
  )
}

export default PostEditor;