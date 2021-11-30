import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.5.194/api',
});

export default api;