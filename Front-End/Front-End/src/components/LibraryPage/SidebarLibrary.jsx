import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, User, Upload, Clock, LogOut, CreditCard } from "lucide-react";
import { PiPassword } from "react-icons/pi";
import { useDarkMode } from "../../pages/DarkModeContext";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

function SidebarLibrary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useDarkMode();

  const menuItems = [
    { path: "/Profile", label: "Thông tin cá nhân", icon: User },
    { path: "/LibraryPage", label: "Tủ truyện", icon: BookOpen },
    { path: "/UploadPage", label: "Đăng truyện", icon: Upload },
    { path: "/PaymentItem", label: "Nạp xu", icon: CreditCard },
    { path: "/TransactionPayment", label: "Lịch sử giao dịch", icon: Clock },
    { path: "/ChangePasswordModal", label: "Đổi mật khẩu", icon: PiPassword },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLoggedIn");
    navigate("/HomePage", { replace: true });
  };

  return (
    <aside
      className="
        w-64 p-5 mt-6 flex flex-col self-start shadow-lg 
        bg-white dark:bg-[#1E293B] backdrop-blur-xl 
        border border-gray-200 dark:border-gray-700/60 
        transition-all duration-300
      "
    >
      {/* Tiêu đề */}
      <h2 className="text-lg font-bold mb-8 text-gray-800 dark:text-gray-100">
        Tủ truyện
      </h2>

      {/* Menu */}
      <nav className="flex flex-col space-y-2">
        {menuItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group
                ${
                  active
                    ? "bg-blue-100 dark:bg-blue-600/30 text-blue-600 dark:text-blue-400 font-medium shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-blue-500 dark:hover:text-blue-400"
                }
              `}
            >
              <Icon
                className={`h-5 w-5 transition-colors duration-200 ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "group-hover:text-blue-400"
                }`}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Đăng xuất</span>
        </button>
      </div>

      {/* Toggle Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="
          fixed top-5 right-5 z-50 p-2 rounded-full shadow-md border
          border-gray-200 dark:border-gray-600 
          bg-white dark:bg-gray-800 hover:scale-110 transform transition-all
        "
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <IoMdSunny className="text-yellow-300 w-6 h-6" />
        ) : (
          <MdDarkMode className="text-indigo-700 w-6 h-6" />
        )}
      </button>
    </aside>
  );
}

export default SidebarLibrary;
