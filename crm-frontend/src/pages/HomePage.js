import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>欢迎来到我的CRM系统</h1>
      <p>简约设计，高效管理</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary btn-lg mr-2">登录</Link>
        <Link to="/register" className="btn btn-secondary btn-lg">注册</Link>
      </div>
    </div>
  );
};

export default HomePage;