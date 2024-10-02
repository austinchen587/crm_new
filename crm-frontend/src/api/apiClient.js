// src/api/apiClient.js
import axios from 'axios';

// 从 localStorage 获取 token
const token = localStorage.getItem('token');

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // 基础URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,  // 使用 Token 进行认证
  },
});

// 添加请求拦截器，将 Token 添加到请求头
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // 从 localStorage 获取 token
  if (token) {
    config.headers.Authorization = `Token ${token}`;  // 将 Token 添加到请求头
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;