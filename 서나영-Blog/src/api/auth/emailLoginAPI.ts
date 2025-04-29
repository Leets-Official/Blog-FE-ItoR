import api from '@/api/axios';
import { LoginSchema } from '@/schema/auth';

export const emailLogin = async (
  credentials: LoginSchema,
): Promise<{
  accessToken: string;
  refreshToken: string;
  nickname: string;
  profilePicture: string;
}> => {
  const response = await api.post('/auth/login', credentials);

  const { accessToken, refreshToken, nickname, profilePicture } = response.data.data;

  // localStorage에 저장
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('profilePicture', profilePicture);

  return { accessToken, refreshToken, nickname, profilePicture };
};
