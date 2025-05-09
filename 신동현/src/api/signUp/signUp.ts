import { api } from "../api";

const EmailSignUp = async (email: string, nickname: string, password: string, profilePicture: string, birthDate: string, name: string, introduction: string) => {
  try {
    const response = await api.post("/auth/register", {
      email,
      nickname,
      password,
      profilePicture,
      birthDate,
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

const KakaoSignUp = async (email: string, nickname: string, profilePicture: string, birthDate: string, name: string, introduction: string, kakaoId: string) => {
  try {
    const response = await api.post("/auth/register-oauth", {
      email,
      nickname,
      profilePicture,
      birthDate,
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

