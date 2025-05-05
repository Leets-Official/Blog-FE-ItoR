import { Add_photo } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";
import styled from "styled-components";
import { useState } from "react";

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
`;


const Write = () => {
  const [title, setTitle] = useState("");
  return (
    <Wrapper>
      <Hr />
      <Button onClick={() => { }} icon={<Add_photo fill="#909090" />} fontSize="12px" width="130px" height="25px" color="#909090" backgroundColor="#FFFFFF">사진 추가하기</Button>      
      <Container>
        <TitleInputContainer>
          <Input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} style={{ fontSize: "24px", fontWeight: "500" }} noneBorder={true} />
        </TitleInputContainer>
        <Hr />
      </Container>
        <Textarea placeholder="어떠한 것을 깨달았나요?" cols={15} rows={1000}/>
    </Wrapper>
  )
}

export default Write;
