import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCustomers} from '../api/customerApi';
import CustomerList from '../components/CustomerList';
import { getCurrentUser } from '../api/authApi';


const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 加载客户数据
    loadCustomers();
    // 加载当前用户信息
    loadCurrentUser();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('加载客户数据失败:', error);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    } catch (error) {
      console.error('获取当前用户信息失败:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>客户管理</h2>
      {/* 添加客户按钮 */}
      <Link to="/add-customer" className="btn btn-success mb-3">添加客户</Link>
      {/* 确保 currentUser 被传递 */}
      {currentUser ? (
        <CustomerList customers={customers} currentUser={currentUser} />
      ) : (
        <p>正在加载用户信息...</p>
      )}
    </div>
  );
};

export default CustomerPage;