import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, User, Upload, Clock, LogOut } from "lucide-react";

function SidebarLibrary() {
  const location = useLocation();

  const menuItems = [
    { path: "/Profile", label: "Thông tin cá nhân", icon: User },
    { path: "/LibraryPage", label: "Tủ truyện", icon: BookOpen },
    { path: "/UploadNovel", label: "Đăng truyện", icon: Upload },
    { path: "/Transactions", label: "Lịch sử giao dịch", icon: Clock },
  ];

  return (
    <aside className="w-64 bg-white shadow-md rounded-md p-5 mt-6 inline-block align-top">
      {/* Heading */}
      <h2 className="text-lg font-bold text-gray-800 mb-8">Tủ truyện</h2>

      {/* Menu */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-6">
        <Link
          to="/HomePage"
          className="flex items-center space-x-3 px-3 py-2 rounded-md text-red-600 hover:text-red-700 transition-colors font-medium"
        >
          <LogOut className="h-5 w-5" />
          <span>Đăng xuất</span>
        </Link>
      </div>
    </aside>
  );
}

export default SidebarLibrary;
