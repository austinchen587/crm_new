// src/pages/CustomerDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // 用于获取URL中的id参数
import { getCustomerById } from '../api/customerApi';  // 导入获取客户详情的API
import './CustomerDetailPage.css';  // 导入样式

const CustomerDetailPage = () => {
  const { id } = useParams();  // 获取URL中的id参数
  const [customer, setCustomer] = useState(null);  // 用于存储客户详情

  useEffect(() => {
    loadCustomer();
  }, [id]);

  const loadCustomer = async () => {
    try {
      const data = await getCustomerById(id);  // 通过id获取客户详情
      setCustomer(data);  // 将客户详情存储到state中
    } catch (error) {
      console.error('获取客户详情失败:', error);  // 打印错误信息
    }
  };

  if (!customer) {
    return <p>正在加载客户信息...</p>;  // 如果客户信息未加载，显示加载中提示
  }

  return (
    <div className="customer-detail-container">
      <h2>客户详情</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>姓名</th>
            <td>{customer.name}</td>
          </tr>
          <tr>
            <th>电话</th>
            <td>{customer.phone}</td>
          </tr>
          <tr>
            <th>创建时间</th>
            <td>{new Date(customer.created_at).toLocaleString()}</td>
          </tr>
          <tr>
            <th>数据来源</th>
            <td>{customer.data_source}</td>
          </tr>
          <tr>
            <th>是否邀约</th>
            <td>{customer.is_invited ? '是' : '否'}</td>
          </tr>
          <tr>
            <th>是否入群</th>
            <td>{customer.is_joined ? '是' : '否'}</td>
          </tr>
          <tr>
            <th>参加第一天直播</th>
            <td>{customer.attended_first_live ? '是' : '否'}</td>
          </tr>
          <tr>
            <th>参加第二天直播</th>
            <td>{customer.attended_second_live ? '是' : '否'}</td>
          </tr>
          <tr>
            <th>是否成交</th>
            <td>{customer.is_closed ? '是' : '否'}</td>
          </tr>
          <tr>
            <th>描述</th>
            <td>{customer.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerDetailPage;