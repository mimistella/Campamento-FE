import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
