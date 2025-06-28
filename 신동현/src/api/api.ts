import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const BaseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const getRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }
    const response = await api.post("/auth/reissue", {
      refreshToken: refreshToken,
    });

    if (response.data.code === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    }
    throw new Error("Failed to refresh access token");
  } catch (error) {
    console.error("Failed to refresh access token", error);
    throw error;
  }
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
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
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 에러 응답 자세히 로깅
    console.log('에러 상태:', error.response?.status);
    console.log('에러 응답:', error.response);
    console.log('에러 설정:', originalRequest);

    // 401 에러 처리
    if (error.response?.status === 401) {
      return Promise.reject(error);
    }

    if (error.response?.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await getRefreshToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('failed to refresh token: ', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);
export { BaseUrl, api };




