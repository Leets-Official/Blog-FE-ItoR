import { ContentBlock, PostContent } from '@/types/post';
import api from '../api';

const PATH = '/posts';

export interface PostRequestBody {
  title: string;
  contents: PostContent[];
}

// POST
const postApi = async (title: string, blocks: ContentBlock[]) => {
  const postData: PostRequestBody = {
    title,
    contents: blocks.map((block, idx) => ({
      contentOrder: idx + 1,
      content: block.type === 'text' ? block.value : block.url || '',
      contentType: block.type.toUpperCase() as 'TEXT' | 'IMAGE',
    })),
  };

  console.log('postData: ', postData);
  const response = await api.post(`${PATH}`, postData);
  return response.data;
};

// DELETE

// PATCH

// GET
export { postApi };
