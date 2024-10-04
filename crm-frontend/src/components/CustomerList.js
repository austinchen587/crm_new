import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CustomerList.css';  // 自定义样式
import { deleteCustomer, getCustomers } from '../api/customerApi';  // 引入删除客户和获取客户的 API 方法

const CustomerList = ({ currentUser }) => {
  const [customers, setCustomers] = useState([]);  // 初始化客户列表的状态为空数组
  const [sortField, setSortField] = useState('created_at');  // 默认排序字段
  const [sortDirection, setSortDirection] = useState('asc');  // 默认排序方向
  const [startDate, setStartDate] = useState('');  // 过滤开始日期
  const [endDate, setEndDate] = useState('');  // 过滤结束日期
  const [errorMessage, setErrorMessage] = useState('');  // 错误信息
  const [loading, setLoading] = useState(true);  // 加载状态

  // API 请求，获取客户数据
  useEffect(() => {
    fetchCustomers();
  }, [startDate, endDate, sortField, sortDirection]);

  // 获取客户列表
  const fetchCustomers = async () => {
    try {
      setLoading(true);

      // 使用 API 获取客户数据
      const response = await getCustomers(startDate, endDate, sortField, sortDirection);
      console.log("收到的客户数据:", response);  // 检查收到的客户数据
      setCustomers(response);
      setLoading(false);
    } catch (error) {
      setErrorMessage('获取客户数据时出错');
      console.error("获取客户列表时出错:", error);
      setLoading(false);
    }
  };

  // 删除客户
  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      fetchCustomers();  // 删除后重新获取客户数据
    } catch (error) {
      console.error('删除客户失败:', error);
    }
  };

  // 排序功能
  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  if (loading) {
    return <div>加载中...</div>;  // 显示加载状态
  }

  if (!customers.length) {
    return <p>当前没有客户信息。</p>;  // 无客户信息时显示提示
  }

  return (
    <div className="table-responsive">
      {/* 时间筛选 */}
      <div className="mb-3">
        <label>开始时间: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control"
        />
        <label>截止时间: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control"
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => handleSort('name')}>姓名</th>
            <th onClick={() => handleSort('phone')}>电话</th>
            <th onClick={() => handleSort('created_at')}>创建时间</th>
            <th onClick={() => handleSort('created_by')}>归属人</th>
            <th onClick={() => handleSort('intention')}>意向程度</th>
            <th>是否邀约</th>
            <th>是否入群</th>
            <th>参加第一天直播</th>
            <th>参加第二天直播</th>
            <th>是否成交</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{customer.created_by}</td>
              <td>{customer.intention}</td>
              <td>{customer.is_invited ? '是' : '否'}</td>
              <td>{customer.is_joined ? '是' : '否'}</td>
              <td>{customer.attended_first_live ? '是' : '否'}</td>
              <td>{customer.attended_second_live ? '是' : '否'}</td>
              <td>{customer.is_closed ? '是' : '否'}</td>
              <td>
                <Link to={`/customer/${customer.id}`} className="btn btn-info btn-sm mr-2">
                  详情
                </Link>
                <Link to={`/edit-customer/${customer.id}`} className="btn btn-warning btn-sm mr-2">
                  更新
                </Link>
                {(currentUser.role === 'admin' || currentUser.role === 'group_leader') && (
                  <button onClick={() => handleDelete(customer.id)} className="btn btn-danger btn-sm">
                    删除
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 错误提示 */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default CustomerList;