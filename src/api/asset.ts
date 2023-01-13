import axios from './axios';

export const getAsset = async () => {
  const response = await axios.get('/asset/asset-to-user');
  return response.data;
};

export const getRequestAsset = async () => {
  const response = await axios.get('/asset/asset-requested');
  return response.data;
};

export const newRequestAsset = async (categoryId: number) => {
  const response = await axios.post('/asset/new-request', { categoryId });
  return response.data;
};
