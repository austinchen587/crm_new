// src/api/customerApi.js
import apiClient from './apiClient';

export const getCustomers = async () => {
  const response = await apiClient.get('customers/');

  // 打印 API 返回的数据，便于调试
  console.log('API 返回的客户数据:', response.data);

  // 返回数据中的 customers 数组，如果存在，否则返回整个数据
  return response.data;
};

export const addCustomer = async (customerData) => {
  try {
    const response = await apiClient.post('customers/add/', customerData);  // 确保使用 POST 方法
    console.log('客户添加成功:', response.data);
    return response.data;
  } catch (error) {
    console.error('添加客户失败:', error);
    throw error;
  }
};

// 删除客户
export const deleteCustomer = async (customerId) => {
  const response = await apiClient.delete(`customers/${customerId}/`);
  console.log('客户删除成功:', response.data);
  return response.data;
};

// 获取单个客户信息
export const getCustomerById = async (id) => {
  const response = await apiClient.get(`customers/${id}/`);
  return response.data;
};

// 更新客户信息
export const updateCustomer = async (id, customerData) => {
  const response = await apiClient.put(`customers/${id}/`, customerData);
  console.log('客户更新成功:', response.data);
  return response.data;
};