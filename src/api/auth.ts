import axios from './axios';

export const auth = async () => {
  const data = await axios.get('/auth');
  return data;
};

export const login = async (username: string, password: string) => {
  const data = await axios.post('/auth/login', {
    username: username,
    password: password,
  });
  axios.defaults.headers.Authorization = `Bearer ${data.data.access_token}`;
  window.localStorage.setItem('access-token', data.data.access_token);
  return data;
};

export const logout = async () => {
  // const data = await axios.post('/auth/logout');
  axios.defaults.headers.Authorization = '';
  window.localStorage.setItem('access-token', '');
  // return data;
};
