import axios from 'axios';
import api from '../api';

const getFileUrl = async (fileName: string) => {
  console.log(fileName);
  if (fileName.length === 0) {
    console.log('빈 파일 이름입니다.');
    return [];
  }

  const res = await api.get(`/images/presigned-url?fileName=${fileName}`);

  return res.data.data;
};

const getPresignedUrl = async (file: File, url: string) => {
  const res = await axios.put(`${url}`, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
  return res;
};

export { getFileUrl, getPresignedUrl };
