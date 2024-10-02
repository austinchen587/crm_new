// src/pages/LoginPage.js
import React, { useState } from 'react';
import { loginUser } from '../api/authApi';  // 登录API
import { useNavigate } from 'react-router-dom';  // 用于导航跳转

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);  // 用于存储错误信息
  const navigate = useNavigate();  // 用于页面跳转

  // 输入框改变时更新状态
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // 提交登录请求
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(credentials);  // 调用登录API
      localStorage.setItem('token', result.token);  // 登录成功后保存 token
      navigate('/customers');  // 登录成功后跳转到客户列表界面
    } catch (error) {
      setError('登录失败，请检查用户名或密码');  // 登录失败时设置错误信息
    }
  };

  return (
    <div>
      <h2>登录</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* 显示错误信息 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
          placeholder="用户名"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="密码"
        />
        <button type="submit" className="btn btn-primary">登录</button>
      </form>
      <p>
        没有账号？ <a href="/register">立即注册</a>  {/* 跳转到注册页面 */}
      </p>
    </div>
  );
};

export default LoginPage;