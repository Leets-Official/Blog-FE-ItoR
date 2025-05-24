import styled from "styled-components";
import { ProfilePlus } from "@/assets";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { signUpEmailSchema, signUpSocialSchema } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailControlContext } from "@/contexts/EmailControlContext";
import Header from "@/components/layout/header/Header";
import { useAtomValue } from "jotai";
import { isModifyAtom } from "@/Atoms/atoms";
import { useEffect, useRef, useState } from "react";
import { UserInfo } from "@/api/user/userInfo";
import { SocialControlContext } from "@/contexts/SocialControlContext";
import Toast from "@/components/ui/Toast";
import { getPresignedUrl } from "@/api/convertImage";
import { uploadImage } from "@/api/convertImage";
import { UserUpdateNickname, UserUpdatePassword, UserUpdateProfilePicture } from "@/api/user/userUpdate";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  background-color: #F5F5F5;
  margin-bottom: 50px;
`;


const ProfileContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
  gap: 20px;
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const ProfileImageContainer = styled.div`
  width: 100%;
`;

const ProfileContentContainer = styled.div`
  width: 100%;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  gap: 20px;
  margin-bottom: 50px;
`;

const InputContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 25px;
  @media (max-width: 700px) {
    width: 90%;
  }
`;


const MyPageDetail = () => {
  const type = useLocation().pathname.split("/")[3];
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const ImgInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<{ id: number; message: string; type: "success" | "error" } | null>(null);
  const isModify = useAtomValue(isModifyAtom);
  const navigate = useNavigate();

  const { control: controlEmail, setValue: setValueEmail, handleSubmit: handleSubmitEmail } = useForm<z.infer<typeof signUpEmailSchema>>({
    resolver: zodResolver(signUpEmailSchema),
    defaultValues: {
      email: "",
      password: "qweasd123!",
      passwordCheck: "qweasd123!",
      name: "테스트입니다",
      birth: "2023-10-10",
      nickname: "",
      bio: "",
    },
  });

  const { control: controlSocial, setValue: setValueSocial, handleSubmit: handleSubmitSocial } = useForm<z.infer<typeof signUpSocialSchema>>({
    resolver: zodResolver(signUpSocialSchema),
    defaultValues: {
      email: "",
      birth: "2023-10-10",
      nickname: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (!isModify) {
      const initUserInfo = async () => {
        const userInfo = await UserInfo();
        setProfileImage(userInfo.data.profilePicture);
        if (type === "email") {
          setValueEmail("email", userInfo.data.email);
          setValueEmail("nickname", userInfo.data.nickname);
          setValueEmail("bio", localStorage.getItem("bio") ?? "");
        } else {
          setValueSocial("email", userInfo.data.email);
          setValueSocial("nickname", userInfo.data.nickname);
          setValueSocial("bio", localStorage.getItem("bio") ?? "");
        }
      }
      initUserInfo();
    }
  }, [isModify]);

  const onSubmit = async (data: z.infer<typeof signUpEmailSchema> | z.infer<typeof signUpSocialSchema>) => {
    let presignedImage: string = "";

    if (profileImageFile) {
      try {
        const presignedUrl = await getPresignedUrl(encodeURIComponent(profileImageFile.name));
        if (presignedUrl.error) {
          showToast(presignedUrl.message, "error");
          return;
        }

        console.log("presignedUrl:", presignedUrl.data);
        console.log("profileImageFile:", profileImageFile);
        console.log("Content-Type:", profileImageFile?.type);

        await uploadImage(profileImageFile, presignedUrl.data);

        presignedImage = presignedUrl.data.split("?")[0];
      } catch (error) {
        showToast("이미지 업로드에 실패했습니다.", "error");
        return;
      }
    }

    let response;
    if (type === "email") {
      const emailData = data as z.infer<typeof signUpEmailSchema>;
      response = await UserUpdatePassword(emailData.password);
      if (response.error) {
        showToast(response.message, "error");
        return;
      }

      response = await UserUpdateNickname(emailData.nickname);
      if (response.error) {
        showToast(response.message, "error");
        return;
      }

      response = await UserUpdateProfilePicture(presignedImage);
      if (response.error) {
        showToast(response.message, "error");
        return;
      }

    } else {
      const socialData = data as z.infer<typeof signUpSocialSchema>;
      response = await UserUpdateNickname(socialData.nickname);
      if (response.error) {
        showToast(response.message, "error");
        return;
      }

      response = await UserUpdateProfilePicture(presignedImage);
      if (response.error) {
        showToast(response.message, "error");
        return;
      }

    }

    showToast("유저 정보 수정에 성공했습니다.", "success");

    localStorage.setItem("nickName", data.nickname);
    localStorage.setItem("profilePicture", presignedImage);

    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 3000);
  }

  const handleProfileImageChange = () => {
    if (ImgInputRef.current) {
      ImgInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("이미지 파일만 업로드 가능합니다.", "error");
        return;
      }

      // 파일 입력값 초기화
      if (ImgInputRef.current) {
        ImgInputRef.current.value = '';
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageFile(file);
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <Wrapper>
      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} />}
      <Header type="mypage" onPublish={type === "email" ? handleSubmitEmail(onSubmit) : handleSubmitSocial(onSubmit)} />
      <TopContainer>
        <ProfileContainer>
          <ProfileImageContainer>
            <input type="file" ref={ImgInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            <Button
              width="64px"
              height="64px"
              backgroundColor="#F5F5F5"
              icon={profileImage ? <img src={profileImage} alt="profile" width="64px" height="64px" style={{ borderRadius: "50%" }} /> : <ProfilePlus width="64px" height="64px" />}
              onClick={handleProfileImageChange}
              disabled={!isModify}
            />
          </ProfileImageContainer>
          <ProfileContentContainer>
            {type === "email" ? (
              <>
                <Input
                  type="text"
                  placeholder="닉네임"
                  control={controlEmail}
                  name="nickname"
                  subTitle="* 20글자 이내"
                  style={{ fontSize: "24px", fontWeight: "500", color: "#000000", backgroundColor: "#F5F5F5" }}
                  disabled={!isModify}
                />
                <Input
                  type="text"
                  placeholder="한 줄 소개"
                  control={controlEmail}
                  name="bio"
                  style={{ fontSize: "14px", fontWeight: "300", color: "#000000", backgroundColor: "#F5F5F5" }}
                  disabled={true}
                />
              </>
            ) : (
              <>
                <Input
                  type="text"
                  placeholder="닉네임"
                  control={controlSocial}
                  name="nickname"
                  subTitle="* 20글자 이내"
                  style={{ fontSize: "24px", fontWeight: "500", color: "#000000", backgroundColor: "#F5F5F5" }}
                  disabled={!isModify}
                />
                <Input
                  type="text"
                  placeholder="한 줄 소개"
                  control={controlSocial}
                  name="bio"
                  style={{ fontSize: "14px", fontWeight: "300", color: "#000000", backgroundColor: "#F5F5F5" }}
                  disabled={true}
                />
              </>
            )}
          </ProfileContentContainer>
        </ProfileContainer>
      </TopContainer>
      <BottomContainer>
        <InputContainer>
          {type === "email" ? <EmailControlContext.Provider value={{ control: controlEmail }}><Outlet /></EmailControlContext.Provider> : <SocialControlContext.Provider value={{ control: controlSocial }}><Outlet /></SocialControlContext.Provider>}
        </InputContainer>
      </BottomContainer>
    </Wrapper>
  )
}

export default MyPageDetail;  
