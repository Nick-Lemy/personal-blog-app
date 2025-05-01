// src/api/axios.js
import axios from 'axios';
import { BACKEND_BASE_URL } from '../utils/environment.varible.mjs';

const instance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;