import { Add_photo } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";
import styled from "styled-components";
import { useState, createContext, useEffect } from "react";
import { writeSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Header from "@/components/layout/header/Header";
import Toast from "@/components/ui/Toast";

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
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const { control: controlWrite, handleSubmit: handleSubmitWrite, formState: { errors } } = useForm<z.infer<typeof writeSchema>>({
    resolver: zodResolver(writeSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (errors.content) {
      setToast({ message: "내용을 입력해주세요.", type: "error" });
    } else {
      setToast(null);
    }
  }, [errors.content]);

  const onSubmit = (data: z.infer<typeof writeSchema>) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <Header type="write" onPublish={handleSubmitWrite(onSubmit)} />
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <Hr />
      <Button onClick={() => { }} icon={<Add_photo fill="#909090" />} fontSize="12px" width="130px" height="25px" color="#909090" backgroundColor="#FFFFFF">사진 추가하기</Button>
      <Container>
        <TitleInputContainer>
          <Input type="text" placeholder="제목" value={""} style={{ fontSize: "24px", fontWeight: "500" }} noneBorder={true} name="title" control={controlWrite} />
        </TitleInputContainer>
        <Hr />
      </Container>
      <Controller
        control={controlWrite}
        name="content"
        render={({ field }) => (
            <Textarea placeholder="어떠한 것을 깨달았나요?" cols={15} rows={100} value={field.value} onChange={field.onChange} />
        )}
      />
    </Wrapper>
  )
}

export default Write;
