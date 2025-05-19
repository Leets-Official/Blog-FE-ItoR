import { api } from "../api";

const UserUpdateAll = async (email: string, nickname: string, password: string, profilePicture: string, birthDate: string, name: string, introduction: string) => {
  try {
    const response = await api.patch("/users", {
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
    console.log("UserUpdate Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "유저 정보 수정에 실패했습니다."
    };
  }
};

const UserUpdateNickname = async (nickname: string) => {
  try {
    const response = await api.patch("/users/nickname", {
      nickname,
    });
    return response.data;
  } catch (error: any) {
    console.log("UserUpdateNickname Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "닉네임 수정에 실패했습니다."
    };
  }
};

const UserUpdatePassword = async (password: string) => {
  try {
    const response = await api.patch("/users/password", {
      password,
    });
    return response.data;
  } catch (error: any) {
    console.log("UserUpdatePassword Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "비밀번호 수정에 실패했습니다."
    };
  }
};

const UserUpdateProfilePicture = async (profilePicture: string) => {
  try {
    const response = await api.patch("/users/picture", {
      profilePicture,
    });
    return response.data;
  } catch (error: any) {
    console.log("UserUpdateProfilePicture Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "프로필 사진 수정에 실패했습니다."
    };
  }
};

export { UserUpdateAll, UserUpdateNickname, UserUpdatePassword, UserUpdateProfilePicture };
