import api from '@/api/api';

const getFileUrl = async (fileName: string) => {
  const res = await api.get(`/images/presigned-url?fileName=${fileName}`);

  return res.data.data;
};

const getPresignedUrl = async (file: File, url: string) => {
  const res = await api.put(`${url}`, file);
  return res;
};

export { getFileUrl, getPresignedUrl };
