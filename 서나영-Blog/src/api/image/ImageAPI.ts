import axios from 'axios';
import api from '@/api/api';

/**
 * presigned URL 요청
 */
export const getPresignedUrl = async (fileName: string): Promise<string> => {
  const response = await api.get('/images/presigned-url', {
    params: { fileName },
  });
  console.log('Image url 요청 응답:', response.data);
  return response.data.data;
};

/**
 * presigned URL로 이미지 업로드
 */
export const uploadImage = async (presignedUrl: string, file: File): Promise<string> => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return presignedUrl.split('?')[0];
};
