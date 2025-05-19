import api from '@/api/api';

const PATH = '/users';

// GET
const getMyInfo = async () => {
  const res = await api.get(`${PATH}/me`);
  return res.data.data;
};

export { getMyInfo };
