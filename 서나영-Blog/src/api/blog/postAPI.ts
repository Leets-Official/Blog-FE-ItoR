import api from '@/api/api';
import { BlogPost } from '@/types/blogPost';

// 토큰 없는 게시글 리스트 조회
export const getPostList = async (page: number, size: number) => {
  console.log('게시물 리스트 요청 params:', { page, size });

  const response = await api.get<{ code: number; message: string; data: BlogPost[] }>(
    `/posts/all`,
    { params: { page, size } },
  );
  console.log('게시글 리스트 조회: ', response.data);
  return response.data.data;
};

// 토큰 있는 게시글 리스트 조회
export const getPostListWithToken = async (page: number, size: number) => {
  const response = await api.get<{ code: number; message: string; data: BlogPost[] }>(
    `/posts/all/token`,
    { params: { page, size } },
  );
  console.log('게시글 리스트 조회: ', response.data);
  return response.data.data;
};
