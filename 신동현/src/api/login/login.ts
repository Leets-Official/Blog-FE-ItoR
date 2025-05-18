import { BaseUrl, api } from "../api";

const EamilLogin = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password
    });
    return response.data;
  } catch (error: any) {
    console.log("Email Login Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "로그인에 실패했습니다."
    };
  }
};

const KakaoLogin = async () => {
  const url = `${BaseUrl}/auth/kakao`;
  window.location.href = url;
}

const KakaoRedirect = async (code: string) => {
  const response = await api.get("/auth/kakao/redirect", {
    params: { code },
  });
  return response.data;
}

export { EamilLogin, KakaoLogin, KakaoRedirect };
