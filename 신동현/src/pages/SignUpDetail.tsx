import { useLocation } from "react-router-dom";
import Header from "@/components/layout/header/Header";
import styled from "styled-components";
import Button from "@/components/ui/Button/Button";
import { Add_photo, Kakao, Profile } from "@/assets";
import Input from "@/components/ui/Input";
import { useState } from "react";
import Modal from "@/components/ui/Modal/Modal";
import ActionButton from "@/components/ui/Button/ActionButton";
import signUpSchema from "@/schema/auth";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  gap: 30px;
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
  gap: 50px;
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



const EmailUI = ({ control }: { control: Control<z.infer<typeof signUpSchema>> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  return (
    <InputContainer>
      <Input title="이메일" type="text" placeholder="이메일" control={control} name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
      <Input title="비밀번호" type="password" placeholder="비밀번호" control={control} name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      <Input title="비밀번호 확인" type="password" placeholder="비밀번호 확인" control={control} name="passwordCheck" value={passwordCheck} onChange={(e) => { setPasswordCheck(e.target.value) }} />
      <Input title="이름" type="text" placeholder="이름" control={control} name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
      <Input title="생년월일" type="text" placeholder="YYYY-MM-DD" control={control} name="birth" value={birth} onChange={(e) => { setBirth(e.target.value) }} />
      <Input title="닉네임" type="text" placeholder="닉네임" control={control} name="nickname" value={nickname} onChange={(e) => { setNickname(e.target.value) }} />
      <Input title="한 줄 소개" type="text" placeholder="한 줄 소개" control={control} name="bio" value={bio} onChange={(e) => { setBio(e.target.value) }} />
    </InputContainer>
  )
}

const KaKaoUI = ({ control }: { control: Control<z.infer<typeof signUpSchema>> }) => {
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

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
      {/* <InputShape title="이메일" />
      <InputShape title="이름"/>
      <InputShape title="생년월일" /> */}
      <Input title="닉네임" type="text" placeholder="닉네임" subTitle="* 20글자 이내" control={control} name="nickname" value={nickname} onChange={(e) => { setNickname(e.target.value) }} />
      <Input title="한 줄 소개" type="text" placeholder="한 줄 소개" control={control} name="bio" value={bio} onChange={(e) => { setBio(e.target.value) }} />
    </InputContainer>
  )
}

const SignUpDetail = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      birth: "",
      nickname: "",
      bio: "",
    }
  });
  const location = useLocation();
  const type = location.search.split("=")[1];

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const openConfirmModal = () => {
    setIsOpenConfirmModal(true);
  }

  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false);
  }

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
    openConfirmModal();
  }

  return (
    <Wrapper>
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
            <Button onClick={() => { }} icon={<Profile width="90px" height="90px" />} width="40px" height="40px" style={{ paddingLeft: "40px" }}></Button>
            <Button onClick={() => { }} icon={<Add_photo fill="#909090" />} fontSize="12px" width="130px" height="25px" color="#909090" backgroundColor="#FFFFFF" style={{ border: "1px solid #E6E6E6" }}>프로필 사진 추가</Button>
          </ProfileChangeContainer>
        </ProfileContainer >
        {type === "email" ? <EmailUI control={control} /> : <KaKaoUI control={control} />}
        <ButtonContainer>
          <ActionButton type="blue" width="100%" height="38px" onClick={handleSubmit(onSubmit)}>회원가입</ActionButton>
        </ButtonContainer>
      </MainContainer>
      <Modal open={isOpenConfirmModal} title="회원가입이 완료되었습니다!" onCancel={closeConfirmModal} onConfirm={() => { }} onClose={closeConfirmModal} cancelText="확인" confirmText="로그인하기" confirmType="positive" animation="fadeIn">
      </Modal>
    </Wrapper>
  )
}

export default SignUpDetail;
