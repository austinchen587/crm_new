import React from 'react';
import { Link } from 'react-router-dom';
import './CustomerList.css';  // 自定义样式
import { deleteCustomer } from '../api/customerApi';  // 引入删除客户的 API 方法

const CustomerList = ({ customers, currentUser }) => {
  // 删除客户
  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      // 你可以根据需要在这里调用父组件提供的刷新列表函数或者在页面重新加载客户数据。
      window.location.reload();  // 删除后刷新页面
    } catch (error) {
      console.error('删除客户失败:', error);
    }
  };


  if (!Array.isArray(customers) || customers.length === 0) {
    return <p>当前没有客户信息。</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>姓名</th>
            <th>电话</th>
            <th>归属人</th>
            <th>创建时间</th>
            <th>数据来源</th>
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
              <td>{customer.created_by}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{customer.data_source}</td>
              <td>{customer.is_invited ? '是' : '否'}</td>
              <td>{customer.is_joined ? '是' : '否'}</td>
              <td>{customer.attended_first_live ? '是' : '否'}</td>
              <td>{customer.attended_second_live ? '是' : '否'}</td>
              <td>{customer.is_closed ? '是' : '否'}</td>
              <td>
                {/* 详情按钮 */}
                <Link to={`/customer/${customer.id}`} className="btn btn-info btn-sm mr-2">
                  详情
                </Link>

                {/* 修改按钮 - 所有角色都有权限 */}
                <Link to={`/edit-customer/${customer.id}`} className="btn btn-warning btn-sm mr-2">
                  更新
                </Link>

                {/* 仅当当前用户有权限时，显示删除按钮 */}
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
    </div>
  );
};

export default CustomerList;