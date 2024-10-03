import { Route, Routes } from 'react-router-dom';  
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CustomerPage from './pages/CustomerPage';
import HomePage from './pages/HomePage';  // 引入封面页面
import AddCustomerPage from './pages/AddCustomerPage';
import EditCustomerPage from './pages/EditCustomerPage';
import CustomerDetailPage from './pages/CustomerDetailPage';

const RoutesConfig = ({ setCurrentUser }) => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* 默认首页显示封面 */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />  {/* 传递 setCurrentUser */}
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/add-customer" element={<AddCustomerPage />} />  {/* 添加客户页面 */}
        <Route path="/edit-customer/:id" element={<EditCustomerPage />} /> {/* 添加编辑客户的路由 */}
        <Route path="/customer/:id" element={<CustomerDetailPage />} /> {/* 客户详情路由 */}
      </Routes>
  );
};

export default RoutesConfig;