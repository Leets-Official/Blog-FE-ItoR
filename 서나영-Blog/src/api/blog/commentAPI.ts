import api from '@/api/api';

// 댓글 작성
export const createComment = async (postId: string, content: string) => {
  const response = await api.post(`/comments/${postId}`, { content });

  console.log('댓글 작성: ', response.data);
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (commentId: string) => {
  const response = await api.delete(`/comments/${commentId}`);

  console.log('댓글 삭제: ', response.data);
  return response.data;
};

// 댓글 수정
export const updateComment = async (commentId: string, content: string) => {
  const response = await api.patch(`/comments/${commentId}`, { content });

  console.log('댓글 수정: ', response.data);
  return response.data;
};
