import api from '@/api/api';

const PATH = '/comments';

// POST
const postCommentApi = async (postId: string, content: string) => {
  const response = await api.post(`${PATH}/${postId}`, { content });
  return response.data;
};

export { postCommentApi };
