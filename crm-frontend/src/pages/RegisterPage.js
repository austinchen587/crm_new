// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [success, setSuccess] = useState(false);  // 用于显示注册成功信息
  const navigate = useNavigate();  // 用于页面跳转

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      setSuccess(true);  // 显示注册成功信息
      setTimeout(() => {
        navigate('/login');  // 3秒后跳转到登录页面
      }, 3000);
    } catch (error) {
      console.error('注册失败:', error);
    }
  };

  return (
    <div>
      <h2>注册</h2>
      {success && <p style={{ color: 'green' }}>注册成功，3秒后跳转到登录页面...</p>}  {/* 显示注册成功信息 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          placeholder="用户名"
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="密码"
        />
        <button type="submit" className="btn btn-primary">注册</button>
      </form>
    </div>
  );
};

export default RegisterPage;