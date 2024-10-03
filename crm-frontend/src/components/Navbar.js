import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      onLogout();  // 执行父组件传递的注销函数
      navigate('/');  // 成功注销后跳转回主页
    } catch (error) {
      console.error('注销失败:', error);  // 处理可能的注销错误
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand">CRM 系统  阿里云摩尔狮</span>
        <div className="ml-auto">
          {currentUser ? (
            <>
              <span className="navbar-text mr-3">当前用户: {currentUser.username}</span>
              <button onClick={handleLogout} className="btn btn-outline-danger">
                注销
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-primary">登录</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;