// src/pages/AddCustomerPage.js
import React, { useState } from 'react';
import { addCustomer } from '../api/customerApi';
import { useNavigate } from 'react-router-dom';

const AddCustomerPage = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    education: 'bachelor',
    major_category: 'it',
    status: 'employed',
    address: '',
    city: '',
    is_closed: false,
    is_invited: false,
    is_joined: false,
    data_source: 'ai',
    attended_first_live: false,
    attended_second_live: false,
    first_day_watch_duration: 0,
    second_day_watch_duration: 0,
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCustomer(customerData);
      alert('客户添加成功！');
      navigate('/customers');  // 添加成功后跳转到客户列表页面
    } catch (error) {
      alert('添加客户失败');
    }
  };

  return (
    <div className="container">
      <h1>添加客户</h1>
      <form onSubmit={handleSubmit}>
        {/* 姓名 */}
        <div className="form-group">
          <label htmlFor="name">姓名:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={customerData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* 电话 */}
        <div className="form-group">
          <label htmlFor="phone">电话:</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* 学历 */}
        <div className="form-group">
          <label htmlFor="education">学历:</label>
          <select
            className="form-control"
            name="education"
            value={customerData.education}
            onChange={handleChange}
          >
            <option value="below_college">大专以下</option>
            <option value="college">大专</option>
            <option value="bachelor">本科</option>
            <option value="master_above">研究生及以上</option>
            <option value="unknow">未知</option>
          </select>
        </div>

        {/* 专业类别 */}
        <div className="form-group">
          <label htmlFor="major_category">专业类别:</label>
          <select
            className="form-control"
            name="major_category"
            value={customerData.major_category}
            onChange={handleChange}
          >
            <option value="it">IT</option>
            <option value="non_it">非IT</option>
            <option value="unknow">未知</option>
          </select>
        </div>

        {/* 状态 */}
        <div className="form-group">
          <label htmlFor="status">状态:</label>
          <select
            className="form-control"
            name="status"
            value={customerData.status}
            onChange={handleChange}
          >
            <option value="employed">在职</option>
            <option value="unemployed">待业</option>
            <option value="unknow">未知</option>
          </select>
        </div>

        {/* 就业意向城市 */}
        <div className="form-group">
          <label htmlFor="address">就业意向城市:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={customerData.address}
            onChange={handleChange}
          />
        </div>

        {/* 当前所在城市 */}
        <div className="form-group">
          <label htmlFor="city">当前所在城市:</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={customerData.city}
            onChange={handleChange}
          />
        </div>

        {/* 是否成交 */}
        <div className="form-group">
          <label htmlFor="is_closed">是否成交:</label>
          <input
            type="checkbox"
            className="form-check-input"
            name="is_closed"
            checked={customerData.is_closed}
            onChange={handleChange}
          />
        </div>

        {/* 是否邀约 */}
        <div className="form-group">
          <label htmlFor="is_invited">是否邀约:</label>
          <input
            type="checkbox"
            className="form-check-input"
            name="is_invited"
            checked={customerData.is_invited}
            onChange={handleChange}
          />
        </div>

        {/* 是否入群 */}
        <div className="form-group">
          <label htmlFor="is_joined">是否入群:</label>
          <input
            type="checkbox"
            className="form-check-input"
            name="is_joined"
            checked={customerData.is_joined}
            onChange={handleChange}
          />
        </div>

        {/* 数据来源 */}
        <div className="form-group">
          <label htmlFor="data_source">数据来源:</label>
          <select
            className="form-control"
            name="data_source"
            value={customerData.data_source}
            onChange={handleChange}
          >
            <option value="ai">AI数据</option>
            <option value="video_number">视频号</option>
            <option value="other">其他</option>
          </select>
        </div>

        {/* 参加第一天直播 */}
        <div className="form-group">
          <label htmlFor="attended_first_live">参加第一天直播:</label>
          <input
            type="checkbox"
            className="form-check-input"
            name="attended_first_live"
            checked={customerData.attended_first_live}
            onChange={handleChange}
          />
        </div>

        {/* 参加第二天直播 */}
        <div className="form-group">
          <label htmlFor="attended_second_live">参加第二天直播:</label>
          <input
            type="checkbox"
            className="form-check-input"
            name="attended_second_live"
            checked={customerData.attended_second_live}
            onChange={handleChange}
          />
        </div>

        {/* 第一日观看时长 */}
        <div className="form-group">
          <label htmlFor="first_day_watch_duration">第一天观看时长:</label>
          <input
            type="number"
            className="form-control"
            name="first_day_watch_duration"
            value={customerData.first_day_watch_duration}
            onChange={handleChange}
          />
        </div>

        {/* 第二日观看时长 */}
        <div className="form-group">
          <label htmlFor="second_day_watch_duration">第二天观看时长:</label>
          <input
            type="number"
            className="form-control"
            name="second_day_watch_duration"
            value={customerData.second_day_watch_duration}
            onChange={handleChange}
          />
        </div>

        {/* 客户描述 */}
        <div className="form-group">
          <label htmlFor="description">客户描述:</label>
          <textarea
            className="form-control"
            name="description"
            value={customerData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          提交
        </button>
      </form>
    </div>
  );
};

export default AddCustomerPage;