import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const BaseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// 리프레시 토큰 요청 함수
const getRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

    const response = await api.post(`/auth/reissue`, { refreshToken });

    if (response.data.code === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    }
    throw new Error('새로운 리프레시 토큰을 받아오지 못했습니다.');
  } catch (error) {
    console.error('리프레시 토큰 요청 실패: ', error);
    throw error;
  }
};

// 요청 인터셉터 (모든 요청에 Authorization 헤더 추가)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const newHeaders = new AxiosHeaders(config.headers || {});

    if (accessToken) {
      newHeaders.set('Authorization', `Bearer ${accessToken}`);
    }
    if (refreshToken) {
      newHeaders.set('Authorization_refresh', `Bearer ${refreshToken}`);
    }

    return { ...config, headers: newHeaders };
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      try {
        const { accessToken, refreshToken } = await getRefreshToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization_refresh = `Bearer ${refreshToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('새로운 엑세스 토큰 발행에 실패했습니다!');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

export { BaseUrl, api };




