import { useNavigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "@/components/ui/Button/Button";
import { Add_photo, Profile } from "@/assets";
import { useRef, useState } from "react";
import Modal from "@/components/ui/Modal/Modal";
import ActionButton from "@/components/ui/Button/ActionButton";
import { signUpEmailSchema, signUpSocialSchema } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EmailSignUp, KakaoSignUp } from "@/api/signUp/signUp";
import Toast from "@/components/ui/Toast";
import { getPresignedUrl, uploadImage } from "@/api/convertImage";
import { EmailControlContext } from "@/contexts/EmailControlContext";
import { SocialControlContext } from "@/contexts/SocialControlContext";
import { useMutation } from "@tanstack/react-query";
import { KakaoSignUpData, SignUpData } from "@/type/User/SignUp";
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

const ButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 40px 0px 40px 0px;
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

const SignUpDetailForm = () => {
  const profilePicture = localStorage.getItem("profilePicture");
  const name = localStorage.getItem("name");
  const type = useLocation().pathname.split("/")[3];
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(profilePicture);
  const ImgInputRef = useRef<HTMLInputElement>(null);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const navigate = useNavigate();

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setToast({ message: "이미지 파일만 업로드 가능합니다.", type: "error" });
        return;
      }
      setToast(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageFile(file);
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const emailSignUpMutation = useMutation({
    mutationFn: (data: SignUpData) => EmailSignUp(data),
    onSuccess: () => {
      setToast({ message: "회원가입에 성공했습니다!", type: "success" });
      openConfirmModal();
    },
    onError: (error) => {
      setToast({ message: "회원가입에 실패했습니다.", type: "error" });
      console.log(error);
    }
  });

  const kakaoSignUpMutation = useMutation({
    mutationFn: (data: KakaoSignUpData) => KakaoSignUp(data),
    onSuccess: () => {
      setToast({ message: "회원가입에 성공했습니다!", type: "success" });
      openConfirmModal();
    },
    onError: (error) => {
      setToast({ message: "회원가입에 실패했습니다.", type: "error" });
      console.log(error);
    }
  });

  const onSubmit = async (data: z.infer<typeof signUpEmailSchema> | z.infer<typeof signUpSocialSchema>) => {
    let presignedImage: string = "";

    if (profileImageFile) {
      try {
        const presignedUrl = await getPresignedUrl(profileImageFile.name);
        if (presignedUrl.error) {
          setToast({ message: presignedUrl.message, type: "error" });
          return;
        }
        await uploadImage(profileImageFile, presignedUrl.data);

        presignedImage = presignedUrl.data.split("?")[0];
      } catch (error) {
        setToast({ message: "이미지 업로드에 실패했습니다.", type: "error" });
        return;
      }
    }

    if (type === "email") {
      const emailSignUpData = {
        email: (data as z.infer<typeof signUpEmailSchema>).email.toString(),
        nickname: (data as z.infer<typeof signUpEmailSchema>).nickname.toString(),
        password: (data as z.infer<typeof signUpEmailSchema>).password.toString(),
        profilePicture: presignedImage,
        birth: (data as z.infer<typeof signUpEmailSchema>).birth.toString(),
        name: (data as z.infer<typeof signUpEmailSchema>).name.toString(),
        introduction: (data as z.infer<typeof signUpEmailSchema>).bio.toString(),
      }      

      emailSignUpMutation.mutate(emailSignUpData);
    } else {
      const kakaoId = localStorage.getItem("kakaoId");

      const kakaoSignUpData = {
        email: (data as z.infer<typeof signUpSocialSchema>).email.toString(),
        nickname: (data as z.infer<typeof signUpSocialSchema>).nickname.toString(),
        profilePicture: presignedImage === "" ? profilePicture as string : presignedImage,
        birth: (data as z.infer<typeof signUpSocialSchema>).birth.toString(),
        name: name as string,
        introduction: (data as z.infer<typeof signUpSocialSchema>).bio.toString(),
        kakaoId: kakaoId as string,
      };

      kakaoSignUpMutation.mutate(kakaoSignUpData);
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
    navigate("/", { replace: true });
  }

  const onConfirm = () => {
    closeConfirmModal();
    navigate("/?type=login", { replace: true });
  }

  return (
    <Wrapper>
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
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
        {type === "email" ? <EmailControlContext.Provider value={{ control: controlEmail }}><Outlet /></EmailControlContext.Provider> : <SocialControlContext.Provider value={{ control: controlSocial }}><Outlet /></SocialControlContext.Provider>}
        <ButtonContainer>
          <ActionButton type="blue" width="100%" height="38px" onClick={type === "email" ? handleSubmitEmail(onSubmit) : handleSubmitSocial(onSubmit)}>회원가입</ActionButton>
        </ButtonContainer>
      </MainContainer>
      <Modal open={isOpenConfirmModal} title="회원가입이 완료되었습니다!" onCancel={onCancel} onConfirm={onConfirm} onClose={closeConfirmModal} cancelText="확인" confirmText="로그인하기" confirmType="positive" animation="fadeIn">
      </Modal>
    </Wrapper>
  )
}

export default SignUpDetailForm;
