import api from '@/api/api';
import { BlogPostDetail, BlogPostContent } from '@/types/blogPost';

// 게시글 작성
export const createPost = async (title: string, contents: BlogPostContent[]) => {
  const response = await api.post('/posts', { title, contents });
  console.log('게시글 작성: ', response.data);
  return response.data;
};

// 게시글 조회
export const getPostDetail = async (postId: string) => {
  try {
    const response = await api.get<{
      code: number;
      message: string;
      data: BlogPostDetail;
    }>('/posts', {
      params: { postId },
    });

    return response.data.data;
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (postId: string) => {
  try {
    const response = await api.delete('/posts', {
      params: { postId },
    });
    console.log('게시글 삭제 요청: ', response.data);
    return response;
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    throw error;
  }
};

// 게시글 업데이트
export const updatePost = async (
  postId: string,
  updateData: {
    title: string;
    contents: {
      contentOrder: number;
      content: string;
      contentType: 'TEXT' | 'IMAGE';
    }[];
  },
) => {
  try {
    const response = await api.patch('/posts', updateData, {
      params: { postId },
    });

    console.log('게시글 수정 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
};
