import api from '@/api/api';
import { UpdateUserInfoRequest } from '@/types/user';

// 정보 조회
export const fetchMyInfo = async () => {
  const response = await api.get('/users/me');

  console.log('user 정보 조회: ', response.data);
  return response.data.data;
};

// 닉네임 수정
export const updateNickname = async (nickname: string) => {
  const response = await api.patch('/users/nickname', { nickname });

  console.log('닉네임 수정: ', response.data);
  return response.data;
};

// 프로필 사진 수정
export const updateProfilePicture = async (profilePictureUrl: string) => {
  const response = await api.patch('/users/picture', {
    profilePicture: profilePictureUrl,
  });

  console.log('프로필 사진 수정: ', response.data);
  return response.data;
};

// 비밀번호 수정
export const updatePassword = async (password: string) => {
  const response = await api.patch('/users/password', { password });

  console.log('비밀번호 수정: ', response.data);
  return response.data;
};

// 전체 유저 정보 수정
export const updateUserInfo = async (userInfo: UpdateUserInfoRequest) => {
  const response = await api.patch('/users', userInfo);

  console.log('유저 정보 수정: ', response.data);
  return response.data;
};
