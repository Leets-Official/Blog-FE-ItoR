import { api } from "../api";

const UserInfo = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error: any) {
    console.log("getUserInfo Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "유저 정보를 불러오는데 실패했습니다."
    };
  }
};

export { UserInfo };
