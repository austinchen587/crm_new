import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // 自定义样式
import RoutesConfig from './routes'; // 使用路由配置

function App() {
  return (
    <div className="App">
      {/* 这里只加载路由 */}
      <RoutesConfig />
    </div>
  );
}

export default App;