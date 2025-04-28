import api from "./api";

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

export default EamilLogin;
