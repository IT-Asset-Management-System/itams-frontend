import axios from './axios';

export const getCategories = async () => {
  const data = await axios.get('/category/get-categories');
  return data.data;
};
