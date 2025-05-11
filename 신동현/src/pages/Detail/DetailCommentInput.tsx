import { postComment } from "@/api/post/post";
import { Profile } from "@/assets";
import SubmitButton from "@/components/ui/Button/SubmitButton";
import Image from "@/components/ui/Image";
import Toast from "@/components/ui/Toast";
import { commentSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { z } from "zod";

const UserProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-left: 20px;
`;

const UserProfileImageContainer = styled.div`
  width: 20px;
  height: 20px;
`;

const UserProfileNickname = styled.p`
  font-size: 14px;
  color: #000000;
`;

const CommentInputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #E6E6E6;  
`;

const SubmitButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 50px;
`;

const Textarea = styled.textarea`
  width: 622px;
  height: 106px;
  border: none;
  outline: none;
  resize: none;

  @media (max-width: 700px) {
    width: 90%;
  }  
`;

const DetailCommentInput = () => {
  const { id } = useParams();
  const isLogin = localStorage.getItem("refreshToken") ? true : false;
  const nickName = localStorage.getItem("nickName");
  const profilePicture = localStorage.getItem("profilePicture");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (errors.content) {
      setToast({ message: "댓글을 입력해주세요.", type: "error" });
    } else {
      setToast(null);
    }
  }, [errors.content]);

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      const response = await postComment(id as string, data.content);
      if (response.error) {
        setToast({ message: response.message, type: "error" });
      } else {
        setToast({ message: "댓글을 작성했습니다.", type: "success" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <CommentInputContainer>
      {isLogin ? (
        <>
          {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
          <UserProfileContainer>
            <UserProfileImageContainer>
              {profilePicture ? <Image src={profilePicture} alt="profile" width="20px" height="20px" style={{ borderRadius: "50%" }} /> : <Profile width="20px" height="20px" />}
            </UserProfileImageContainer>
            <UserProfileNickname>{nickName}</UserProfileNickname>
          </UserProfileContainer>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <Textarea placeholder="댓글을 입력해주세요." cols={15} rows={8} style={{
                marginTop: "20px"
              }} onChange={field.onChange} />
            )}
          />
          <SubmitButtonContainer>
            <SubmitButton onClick={handleSubmit(onSubmit)} >등록</SubmitButton>
          </SubmitButtonContainer>
        </>
      ) : (
        <Textarea placeholder="로그인을 하고 댓글을 달아보세요!" cols={15} rows={8} style={{
          marginTop: "20px"
        }} />
      )}
    </CommentInputContainer>
  );
};

export default DetailCommentInput;
