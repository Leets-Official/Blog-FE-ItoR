import { Add_photo } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { writeSchema } from "@/schema/auth";
import { Control, Controller } from "react-hook-form";
import { z } from "zod";
import { FormControlContext } from "./Write";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { postElementsAtom } from "@/Atoms/atoms";
import { useAtom } from "jotai";
import PostDraggable from "@/components/layout/post/PostDraggable";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const Hr = styled.hr`
  width: 100%;
  border-width:1px 0 0 0;
  border-style:solid;
  border-color: #cccccc;
`;

const Container = styled.div`
  width: 668px;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const TitleInputContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 50px 0;
`;

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

const Textarea = styled.textarea`
  width: 622px;
  height: 100%;
  border: none;
  resize: none;
  overflow: hidden;
  outline: none;
  font-size: 14px;
  font-weight: 300;
  @media (max-width: 700px) {
    width: 90%;
  }
  font-family: 'Noto Sans KR', sans-serif;
`;

const PostBoard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const WriteEditor = () => {
  const formContext = useContext(FormControlContext) as { control: Control<z.infer<typeof writeSchema>> };
  const { control } = formContext;
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
    setPostElements([...postElements, { type: "paragraph", children: [{ text: "" }] }]);
  }

  console.log(postElements);

  return (
    <Wrapper>
      <Hr />
      <Button onClick={() => { }} icon={<Add_photo fill="#909090" />} fontSize="12px" width="130px" height="25px" color="#909090" backgroundColor="#FFFFFF">사진 추가하기</Button>
      <Container>
        <TitleInputContainer>
          <Input type="text" placeholder="제목" style={{ fontSize: "24px", fontWeight: "500" }} noneBorder={true} name="title" control={control} />
        </TitleInputContainer>
        <Hr />
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
            <Button onClick={addPostElement} width="100%" height="25px" backgroundColor="#FFFFFF"/>
          </InputContainer>
        ) : (
          <>
            <InputPlaceHolder onClick={addPostElement}>어떠한 것을 깨달았나요?</InputPlaceHolder>
          </>
        )}
      </Container>

      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <Textarea placeholder="어떠한 것을 깨달았나요?" cols={15} rows={100} onChange={field.onChange} />
        )}
      />
    </Wrapper>
  )
}

export default WriteEditor;
