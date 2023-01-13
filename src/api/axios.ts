import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

instance.interceptors.request.use((config: any) => {
  const access_token = window.localStorage.getItem('access-token');

  if (access_token) config.headers['Authorization'] = 'Bearer ' + access_token;
  return config;
});

export default instance;
