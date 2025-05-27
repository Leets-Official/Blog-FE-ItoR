import { api } from "../api";
import { KakaoSignUpData, SignUpData } from "@/type/User/SignUp";
const EmailSignUp = async ({email, nickname, password, profilePicture, birth, name, introduction}: SignUpData) => {
  try {
    const response = await api.post("/auth/register", {
      email,
      nickname,
      password,
      profilePicture,
      birthDate : birth,
      name,
      introduction,
    });
    return response.data;
  } catch (error: any) {
    console.log("EmailSignUp Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "회원가입에 실패했습니다."
    };
  }
};

const KakaoSignUp = async ({email, nickname, profilePicture, birth, name, introduction, kakaoId}: KakaoSignUpData) => {
  try {
    const response = await api.post("/auth/register-oauth", {
      email,
      nickname,
      profilePicture,
      birthDate : birth,
      name,
      introduction,
      kakaoId,
    });
    return response.data;
  } catch (error: any) {
    console.log("KakaoSignUp Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "회원가입에 실패했습니다."
    };
  }
};

export { EmailSignUp, KakaoSignUp };

