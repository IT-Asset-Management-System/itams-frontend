import axios from 'axios';

const token = window.localStorage.getItem('access-token');

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { Authorization: `Bearer ${token}` },
});

export default instance;
