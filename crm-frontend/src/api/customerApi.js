// src/api/customerApi.js
import apiClient from './apiClient';

export const getCustomers = async () => {
  const response = await apiClient.get('customers/list/');

  // 打印 API 返回的数据，便于调试
  console.log('API 返回的客户数据:', response.data);

  // 返回数据中的 customers 数组，如果存在，否则返回整个数据
  return response.data;
};