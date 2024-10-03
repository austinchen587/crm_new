import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // 引入自定义样式文件

const HomePage = () => {
  return (
    <div className="homepage-container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-4">欢迎来到阿里云 CRM 系统</h1>
        <p className="lead">简单、高效，帮助您更好地管理业务。</p>
        <div className="mt-5">
          <Link to="/login" className="btn btn-primary btn-lg mr-3">登录</Link>
          <Link to="/register" className="btn btn-secondary btn-lg">注册</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;