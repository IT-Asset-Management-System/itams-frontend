import axios from './axios';

export const getAsset = async () => {
  const data = await axios.get('/asset/asset-to-user');
  return data.data;
};
