import api from '@/api/api';
import { LoginSchema } from '@/schema/auth';

export const emailLogin = async (credentials: LoginSchema) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { accessToken, refreshToken, nickname, profilePicture, introduction } =
      response.data.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('profilePicture', profilePicture);
    localStorage.setItem('introduction', introduction);

    console.log('로그인 성공:', response);
    return { accessToken, refreshToken, nickname, profilePicture, introduction };
  } catch (error: any) {
    console.error('로그인 실패:', error.response?.data || error.message);
    throw error;
  }
};
