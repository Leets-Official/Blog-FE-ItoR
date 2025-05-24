import { Add_photo } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";
import styled from "styled-components";
import { useState } from "react";
import { postFormSchema } from "@/schema/auth";
import { Control } from "react-hook-form";
import { z } from "zod";
import PostEditor from "@/components/layout/post/PostEditor";
import Toast from "@/components/ui/Toast";
import { postElementsAtom } from "@/Atoms/atoms";
import { useSetAtom } from "jotai";

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

const PostForm = ({ FormControl }: { FormControl: Control<z.infer<typeof postFormSchema>> }) => {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const setPostElements = useSetAtom(postElementsAtom);

  const handleFileInput = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          setToast({ message: "이미지 파일만 업로드 가능합니다.", type: "error" });
          return;
        }
        setToast(null);
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          setPostElements(prev => [...prev, { 
            type: "image", 
            url: base64, 
            file: file,
            content: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };


  return (
    <Wrapper>
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <Hr />
      <Button onClick={handleFileInput} icon={<Add_photo fill="#909090" />} fontSize="12px" width="130px" height="25px" color="#909090" backgroundColor="#FFFFFF">사진 추가하기</Button>
      <Container>
        <TitleInputContainer>
          <Input type="text" placeholder="제목" style={{ fontSize: "24px", fontWeight: "500" }} noneBorder={true} name="title" control={FormControl} />
        </TitleInputContainer>
        <Hr />
        <PostEditor />
      </Container>
    </Wrapper>
  )
}

export default PostForm;
