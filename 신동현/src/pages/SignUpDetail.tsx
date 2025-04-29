import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/header/Header";
import styled from "styled-components";
import Button from "@/components/ui/Button/Button";
import { Add_photo, Kakao, Profile } from "@/assets";
import Input from "@/components/ui/Input";
import { useRef, useState } from "react";
import Modal from "@/components/ui/Modal/Modal";
import ActionButton from "@/components/ui/Button/ActionButton";
import { signUpEmailSchema, signUpSocialSchema } from "@/schema/auth";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EmailSignUp, KakaoSignUp } from "@/api/signUp";
import Toast from "@/components/ui/Toast";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;


const TitleContainer = styled.div`
  width: 100%;
  height: 148px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;
`;

const TitleContentContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  height: 38px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  margin-bottom: 0px; 
`;

const SubTitle = styled.p`
  height: 22px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  color: #333333;
`;

const MainContainer = styled.div`
  width: 668px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 120px; 

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 193px;
  display: flex;
  flex-direction: column;
`;

const ProfileContent = styled.p`
  width: 100%;
  height: 22px;
  font-size: 16px;
  font-weight: 300;
  color: #909090;
`;

const ProfileChangeContainer = styled.div`
  width: 117px;
  height: 131px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 25px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 40px 0px 40px 0px;
`;

const SocialBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialBoxContext = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
`;

const SocialBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  width: 100%;
  background: #E6e6e6;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 300;
  color: #909090;
`;

const SocialBoxTitle = styled.div`
  margin-left: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #909090;
`;

const ProfileImageContainer = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ProfileButton = styled(Button)`
  width: 90px;
  height: 90px;
  padding: 0;
  background-color: transparent;
`;

const EmailUI = ({ control }: { control: Control<z.infer<typeof signUpEmailSchema>> }) => {
  return (
    <InputContainer>
      <Input title="이메일" type="text" placeholder="이메일" control={control} name="email" value={""} onChange={() => { }} />
      <Input title="비밀번호" type="password" placeholder="비밀번호" control={control} name="password" value={""} onChange={() => { }} />
      <Input title="비밀번호 확인" type="password" placeholder="비밀번호 확인" control={control} name="passwordCheck" value={""} onChange={() => { }} />
      <Input title="이름" type="text" placeholder="이름" control={control} name="name" value={""} onChange={() => { }} />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" control={control} name="birth" value={""} onChange={() => { }} />
      <Input title="닉네임" type="text" placeholder="닉네임" control={control} name="nickname" value={""} onChange={() => { }} />
      <Input title="한 줄 소개" type="text" placeholder="한 줄 소개" control={control} name="bio" value={""} onChange={() => { }} />
    </InputContainer>
  )
}

const KaKaoUI = ({ control }: { control: Control<z.infer<typeof signUpSocialSchema>> }) => {
  const name = localStorage.getItem("name");

  return (
    <InputContainer>
      <SocialBoxContainer>
        <SocialBoxTitle>소셜로그인</SocialBoxTitle>
        <SocialBox>
          <SocialBoxContext>
            <Kakao />
            카카오 로그인
          </SocialBoxContext>
        </SocialBox>
      </SocialBoxContainer>
      <Input title="이메일" type="email" placeholder="이메일" control={control} name="email" value={""} onChange={() => { }} />
      <SocialBoxContainer>
        <SocialBoxTitle>이름</SocialBoxTitle>
        <SocialBox>
          <SocialBoxContext>
            {name}
          </SocialBoxContext>
        </SocialBox>
      </SocialBoxContainer>            
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" control={control} name="birth" value={""} onChange={() => { }} />
      <Input title="닉네임" type="text" placeholder="닉네임" control={control} name="nickname" value={""} onChange={() => { }} />
      <Input title="한 줄 소개" type="text" placeholder="한 줄 소개" control={control} name="bio" value={""} onChange={() => { }} />
    </InputContainer>
  )
}

const SignUpDetail = () => {
  const profilePicture = localStorage.getItem("profilePicture");
  const name = localStorage.getItem("name");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [profileImage, setProfileImage] = useState<string>(profilePicture || "");
  const ImgInputRef = useRef<HTMLInputElement>(null);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const type = location.search.split("=")[1];


  const { control: controlEmail, handleSubmit: handleSubmitEmail } = useForm<z.infer<typeof signUpEmailSchema>>({
    resolver: zodResolver(signUpEmailSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      birth: "",
      nickname: "",
      bio: "",
    },
  });

  const { control: controlSocial, handleSubmit: handleSubmitSocial } = useForm<z.infer<typeof signUpSocialSchema>>({
    resolver: zodResolver(signUpSocialSchema),
    defaultValues: {
      email: "",
      birth: "",
      nickname: "",
      bio: "",
    },
  });


  const handleProfileImageChange = () => {
    if (ImgInputRef.current) {
      ImgInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setToast({ message: "이미지 파일만 업로드 가능합니다.", type: "error" });
        return;
      }
      setToast(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof signUpEmailSchema> | z.infer<typeof signUpSocialSchema>) => {
    if (type === "email") {
      const response = await EmailSignUp(
        (data as z.infer<typeof signUpEmailSchema>).email.toString(),
        (data as z.infer<typeof signUpEmailSchema>).nickname.toString(),
        (data as z.infer<typeof signUpEmailSchema>).password.toString(),
        profileImage,
        (data as z.infer<typeof signUpEmailSchema>).birth.toString(),
        (data as z.infer<typeof signUpEmailSchema>).name.toString(),
        (data as z.infer<typeof signUpEmailSchema>).bio.toString(),
      );

      if (response.error) {
        setToast({ message: response.message, type: "error" });
      } else {
        setToast({ message: "회원가입에 성공했습니다!", type: "success" });
        openConfirmModal();
      }
    } else {
      const response = await KakaoSignUp(
        (data as z.infer<typeof signUpSocialSchema>).email.toString(),
        (data as z.infer<typeof signUpSocialSchema>).nickname.toString(),
        profileImage,
        (data as z.infer<typeof signUpSocialSchema>).birth.toString(),
        name as string,
        (data as z.infer<typeof signUpSocialSchema>).bio.toString(),
      );

      if (response.error) {
        setToast({ message: response.message, type: "error" });
      } else {
        setToast({ message: "회원가입에 성공했습니다!", type: "success" });
        console.log(response);
        openConfirmModal();
      }      
      console.log(data);
    }
  }

  const openConfirmModal = () => {
    setIsOpenConfirmModal(true);
  }

  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false);
  }

  const onCancel = () => {
    closeConfirmModal();
    navigate("/");
  }

  const onConfirm = () => {
    closeConfirmModal();
    navigate("/?type=login");
  }

  return (
    <Wrapper>
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <Header type="write" />
      <TitleContainer>
        <TitleContentContainer>
          <Title>회원가입</Title>
          <SubTitle>가입을 위해 회원님의 정보를 입력해주세요.</SubTitle>
        </TitleContentContainer>
      </TitleContainer>
      <MainContainer>
        <ProfileContainer>
          <ProfileContent>프로필 사진</ProfileContent>
          <ProfileChangeContainer>
            <input type="file" ref={ImgInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            <ProfileImageContainer>
              <ProfileButton onClick={handleProfileImageChange} icon={profileImage ? <img src={profileImage} alt="profile" /> : <Profile width="90px" height="90px" />} />
            </ProfileImageContainer>
            <Button onClick={handleProfileImageChange} icon={<Add_photo fill="#909090" />} fontSize="12px" width="130px" height="25px" color="#909090" backgroundColor="#FFFFFF" style={{ border: "1px solid #E6E6E6" }}>프로필 사진 추가</Button>
          </ProfileChangeContainer>
        </ProfileContainer >
        {type === "email" ? <EmailUI control={controlEmail} /> : <KaKaoUI control={controlSocial} />}
        <ButtonContainer>
          <ActionButton type="blue" width="100%" height="38px" onClick={type === "email" ? handleSubmitEmail(onSubmit) : handleSubmitSocial(onSubmit)}>회원가입</ActionButton>
        </ButtonContainer>
      </MainContainer>
      <Modal open={isOpenConfirmModal} title="회원가입이 완료되었습니다!" onCancel={onCancel} onConfirm={onConfirm} onClose={closeConfirmModal} cancelText="확인" confirmText="로그인하기" confirmType="positive" animation="fadeIn">
      </Modal>
    </Wrapper>
  )
}

export default SignUpDetail;
