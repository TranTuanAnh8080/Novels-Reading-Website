import { useEffect, useState } from "react";
import { Search, LogOut, Sun, Moon, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../components/SharedComponents/ThemeContext";

export default function HeaderBook() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("loginStateChanged", checkLogin);
    window.addEventListener("storage", checkLogin);
    const interval = setInterval(checkLogin, 500);

    return () => {
      window.removeEventListener("loginStateChanged", checkLogin);
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate(`/Search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const goToGenreSearch = () => {
    navigate("/Search");
  };

  const handleComingSoon = (e) => {
    e.preventDefault();
    alert("🚧 Tính năng này đang được phát triển, vui lòng quay lại sau! ❤️");
  };

  return (
    <header className="bg-white text-gray-900 border-b border-gray-200 shadow-md sticky top-0 z-50
                    dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 dark:text-white dark:border-gray-800 dark:shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <Link
            to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              INKREALM
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1 justify-center">
          <Link
            to={isLoggedIn ? "/HomeLoggedIn" : "/HomePage"}
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Trang chủ
          </Link>

          <Link to="/Search" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
            Thể loại
          </Link>

          <Link 
            to="#" 
            onClick={handleComingSoon}
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors opacity-70 hover:opacity-100"
          >
            Xếp hạng
          </Link>

          <Link
            to="#"
            onClick={handleComingSoon}
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors opacity-70 hover:opacity-100"
          >
            Mới cập nhật
          </Link>

          <Link 
            to={isLoggedIn ? "/UploadPage" : "/LoginPage"} 
            className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Sáng tác
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm truyện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="rounded-full bg-gray-100 border border-gray-300 pl-4 pr-10 py-1.5 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           placeholder-gray-500 text-sm w-48 lg:w-56
                           dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white"
              />
              <Search 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500" 
                onClick={() => navigate(`/Search?keyword=${encodeURIComponent(searchTerm)}`)}
              />
            </div>
            <button 
                onClick={goToGenreSearch}
                className="p-1.5 rounded-full bg-gray-100 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                title="Lọc thể loại"
            >
                <Filter className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link to="/LoginPage">
                <button className="px-4 py-1.5 text-sm rounded-full border border-gray-300 hover:bg-gray-100 transition
                                   dark:border-gray-700 dark:hover:bg-gray-800">
                  Đăng nhập
                </button>
              </Link>
              <Link to="/RegisterPage">
                <button className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:brightness-110 transition">
                  Đăng ký
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/Profile">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user avatar"
                  className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer hover:opacity-90 transition"
                />
              </Link>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  window.dispatchEvent(new Event("loginStateChanged"));
                  window.location.href = "/HomePage";
                }}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}