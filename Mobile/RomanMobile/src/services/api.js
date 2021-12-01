import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.6.236/api',
});

export default api;