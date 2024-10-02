// src/routes.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // 从 react-router-dom 导入 Routes
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CustomerPage from './pages/CustomerPage';

// 重命名自定义的 Routes 为 RoutesConfig
const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/" element={<LoginPage />} />  {/* 默认页面 */}
      </Routes>
    </Router>
  );
};

export default RoutesConfig;