import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // 自定义样式
import RoutesConfig from './routes'; // 使用路由配置
import Navbar from './components/Navbar';  // 导入 Navbar 组件
import { useLocation } from 'react-router-dom';
import { getCurrentUser } from './api/authApi';  // 从后端获取当前用户信息

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // 从后端 API 获取当前登录用户的信息
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();  // 获取当前登录用户
        setCurrentUser(user);  // 设置当前用户
      } catch (error) {
        console.error('获取用户信息失败', error);
      }
    };

    fetchUser();  // 调用函数获取用户信息
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);  // 清除用户状态
    // 你可以在这里调用一个API来通知后端用户已注销，并清理本地的认证数据
  };

  const isHomepage = location.pathname === '/';  // 检查是否为主页

  return (
    <div className="App">
      {!isHomepage && <Navbar currentUser={currentUser} onLogout={handleLogout} />}  {/* 仅非主页显示导航 */}
      <RoutesConfig setCurrentUser={setCurrentUser} />  {/* 传递 setCurrentUser 到 LoginPage */}
    </div>
  );
}

export default App;