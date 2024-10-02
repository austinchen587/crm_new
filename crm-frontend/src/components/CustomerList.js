// src/components/CustomerList.js
import React from 'react';

const CustomerList = ({ customers }) => {
  if (!Array.isArray(customers) || customers.length === 0) {
    return <p>没有客户数据</p>;  // 如果客户数据为空或不是数组，显示提示信息
  }

  return (
    <ul>
      {customers.map((customer) => (
        <li key={customer.id}>
          {customer.name} - {customer.phone} - {customer.city}  {/* 显示客户信息 */}
        </li>
      ))}
    </ul>
  );
};

export default CustomerList;