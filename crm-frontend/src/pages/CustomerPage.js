// src/pages/CustomerPage.js
import React, { useState, useEffect } from 'react';
import CustomerList from '../components/CustomerList';
import { getCustomers } from '../api/customerApi';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);  // 初始化为一个空数组

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      if (Array.isArray(data)) {
        setCustomers(data);  // 如果返回的是数组，则设置到状态中
      } else {
        console.error('客户数据不是数组:', data);
        setCustomers([]);  // 如果数据不是数组，设为空数组，避免 map 错误
      }
    } catch (error) {
      console.error('加载客户数据失败:', error);
      
    }
  };

  return (
    <div>
      <h1>客户列表</h1>
      <CustomerList customers={customers} />  {/* 传递给 CustomerList */}
    </div>
  );
};

export default CustomerPage;