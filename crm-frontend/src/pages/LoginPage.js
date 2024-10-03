import React, { useState } from 'react';
import { loginUser } from '../api/authApi';  // 登录API
import { useNavigate } from 'react-router-dom';  // 用于导航跳转
import './LoginPage.css';  // 引入自定义样式

const LoginPage = ({ setCurrentUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);  // 用于存储错误信息
  const [loading, setLoading] = useState(false);  // 加载状态
  const navigate = useNavigate();  // 用于页面跳转

  // 输入框改变时更新状态
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // 提交登录请求
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // 开始加载
    try {
      const result = await loginUser(credentials);  // 调用登录API
      localStorage.setItem('token', result.token);  // 登录成功后保存 token
      setCurrentUser({ username: credentials.username, role: 'user' });  // 更新当前用户信息
      navigate('/customers');  // 登录成功后跳转到客户列表界面
    } catch (error) {
      setError('登录失败，请检查用户名或密码');  // 登录失败时设置错误信息
    } finally {
      setLoading(false);  // 停止加载
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="text-center">登录</h2>
        {error && <div className="alert alert-danger">{error}</div>}  {/* 显示错误信息 */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="请输入用户名"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="请输入密码"
              required
            />
          </div>
          <div className="form-group text-center mt-4">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? '加载中...' : '登录'}
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            没有账号？ <a href="/register">立即注册</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;