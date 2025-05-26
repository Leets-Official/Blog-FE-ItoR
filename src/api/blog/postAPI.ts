import api from '@/api/api';
import { BlogPostListResponse } from '@/types/blogPost';

// 토큰 없는 게시글 리스트 조회
export const getPostList = async (page: number, size: number) => {
  const response = await api.get<{ code: number; message: string; data: BlogPostListResponse }>(
    `/posts/all`,
    { params: { page, size } },
  );
  console.log(response.data);
  return response.data.data;
};

// 토큰 있는 게시글 리스트 조회
export const getPostListWithToken = async (page: number, size: number) => {
  const response = await api.get<{ code: number; message: string; data: BlogPostListResponse }>(
    `/posts/all/token`,
    { params: { page, size } },
  );
  console.log(response.data);
  return response.data.data;
};
