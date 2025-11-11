import React, { useState } from "react";
import { LayoutDashboard, Users, BookOpen, BarChart2, UserCircle, LogOut, ChevronLeft, ChevronRight, } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// Cấu hình danh sách menu
const menuItems = [
  { id: 1, name: "Dashboard", icon: LayoutDashboard, route: "dashboard" },
  { id: 2, name: "Tài khoản nội bộ", icon: Users, route: "accounts" },
  // { id: 3, name: "Quản lý truyện", icon: BookOpen, route: "novels" },
  { id: 4, name: "Thống kê doanh thu", icon: BarChart2, route: "revenue" },
  { id: 5, name: "Hồ sơ cá nhân", icon: UserCircle, route: "profile" },
];

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const textVariants = {
    collapsed: { opacity: 0, width: 0, x: -10, transition: { duration: 0.1 } },
    expanded: { opacity: 1, width: "auto", x: 0, transition: { duration: 0.3, delay: 0.1 } },
  };

  const activeClass = "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300";
  const inactiveClass = "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800/60";

  const handleNavigation = (route) => {
    navigate(`/Admin/${route}`);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    navigate("/LoginPage", { replace: true });
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 250 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="h-screen fixed left-0 top-0 bg-white dark:bg-gray-900 
                 shadow-xl flex flex-col justify-between z-50 border-r 
                 border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 h-16">
          <motion.h1
            variants={textVariants}
            animate={isCollapsed ? "collapsed" : "expanded"}
            className="text-2xl font-black text-blue-600 dark:text-blue-700 overflow-hidden whitespace-nowrap cursor-pointer"
            onClick={() => navigate('/Admin')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/Admin'); }}
            title="Đi tới Trang chủ Dashboard"
          >
            INKREALM
          </motion.h1>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-full text-blue-800 dark:text-blue-600 hover:bg-gray-100 
                       dark:hover:bg-gray-800 transition focus:outline-none"
            title={isCollapsed ? "Mở rộng" : "Thu gọn"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-6 h-6" />
            ) : (
              <ChevronLeft className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.route);
            const className = `flex items-center w-full rounded-xl px-4 py-3 mb-2 transition-all duration-200 group ${isActive ? activeClass : inactiveClass
              }`;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.route)}
                className={className}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-blue-600 dark:text-blue-300" : "text-blue-500"
                    }`}
                />
                <motion.span
                  variants={textVariants}
                  animate={isCollapsed ? "collapsed" : "expanded"}
                  className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.name}
                </motion.span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:bg-red-50 
                     dark:hover:bg-red-900/20 w-full rounded-xl px-4 py-2 transition"
        >
          <LogOut className="w-5 h-5" />
          <motion.span
            variants={textVariants}
            animate={isCollapsed ? "collapsed" : "expanded"}
            className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            Đăng xuất
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
