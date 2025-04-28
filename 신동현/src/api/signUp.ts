import api from "./api";

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
  } catch (error) {
    console.error("EmailSignUp Error", error);
    return error;
  }
};

export default EmailSignUp;

