import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/inkrealm_logo.png'; // Đường dẫn logo của bạn

function HeaderProfile({ userData }) {

  // Nếu chưa có userData, lấy từ sessionStorage
  const user = userData || JSON.parse(sessionStorage.getItem('user') || '{}');

  // Avatar mặc định nếu không có
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between rounded-md">
        {/* Logo + slogan */}
        <Link to="/HomeLoggedIn" className="flex items-center space-x-4">
          <img src={logo} alt="InkRealm" className="h-10 w-auto" />
          <span className="text-sm text-gray-600">Thế giới truyện chữ</span>
        </Link>

        {/* Greeting + avatar */}
        <div className="flex items-center space-x-2">
          <Link to="/Profile">
            <span className="text-sm text-gray-700">
              Xin chào, <span className="font-medium">{user.fullName || 'Người dùng'}</span>
            </span>
          </Link>
          <Link to="/Profile">
            <img
              src={user.avatar || defaultAvatar}
              alt="avatar"
              className="w-9 h-9 rounded-full border object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderProfile;