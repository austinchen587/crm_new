// src/api/apiClient.js
import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // 基础URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器，自动添加 token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // 假设 token 存储在 localStorage 中
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // 自动添加 Authorization 头
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;