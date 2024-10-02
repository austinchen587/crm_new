// src/api/authApi.js
import apiClient from './apiClient';

const API_URL = 'auth/';  // 不需要再写完整的URL，因为apiClient已经设置好了baseURL

export const registerUser = async (userData) => {
  console.log('发送注册请求数据:', userData);
  const response = await apiClient.post(`${API_URL}register/`, userData);
  console.log('注册请求响应:', response.data);
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post(`${API_URL}login/`, credentials);
    console.log('登录请求响应:', response.data);
    return response.data;  // 确保返回的数据包含 token
  } catch (error) {
    console.error('登录请求失败:', error);
    throw error;  // 抛出错误让调用方处理
  }
};