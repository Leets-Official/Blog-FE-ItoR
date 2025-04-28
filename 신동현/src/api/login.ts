import api from "./api";

const EamilLogin = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
  });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Email Login Error", error);
    return error;
  }
};

export default EamilLogin;
