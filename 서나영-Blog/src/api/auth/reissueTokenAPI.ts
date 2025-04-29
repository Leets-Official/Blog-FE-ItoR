import api from '@/api/axios';
import { getRefreshToken } from '@/utils/tokenStorage';

export const reissueTokenAPI = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('저장된 refreshToken이 없습니다.');
  }

  try {
    const response = await api.post('/auth/reissue', {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error: any) {
    console.error('토큰 재발급 실패:', error);
    throw new Error('토큰 재발급을 실패했습니다.');
  }
};
