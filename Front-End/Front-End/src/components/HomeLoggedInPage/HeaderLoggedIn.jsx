import React, { useState, useEffect } from "react";
import { Search, Bell, Bookmark, LogOut, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/inkrealm_logo.png";
import { useTheme } from "../../components/SharedComponents/ThemeContext";
export default function HeaderLoggedIn() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) navigate("/HomePage", { replace: true });
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/HomePage", { replace: true });
    window.location.reload();
  };

  const contentMap = {
    about: {
      title: "Về Chúng Tôi",
      body: `
InkRealm là nền tảng đọc truyện sáng tạo, nơi công nghệ và cảm xúc gặp nhau.  
Chúng tôi mang đến không gian đọc hiện đại – mượt mà, cá nhân hóa, không quảng cáo gây gián đoạn. 
Sứ mệnh của chúng tôi là tôn vinh tác giả Việt, lan tỏa tinh thần sáng tạo, và mang đến cho độc giả trải nghiệm đọc truyện thật sự trọn vẹn.`,
    },
    policy: {
      title: "Chính Sách",
      body: `
Chính sách của InkRealm được xây dựng dựa trên sự tôn trọng và minh bạch. 
Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân, bảo vệ quyền sở hữu trí tuệ của tác giả và người dùng. 
Mọi hoạt động đều tuân thủ nghiêm ngặt quy định pháp luật Việt Nam và chuẩn mực cộng đồng văn minh.`,
    },
    rules: {
      title: "Quy Định",
      body: `
Để giữ cho InkRealm luôn là nơi đọc truyện tích cực và an toàn, mọi thành viên vui lòng: 
• Tôn trọng lẫn nhau và dùng ngôn ngữ lịch sự. 
• Không chia sẻ, đăng tải nội dung vi phạm bản quyền hoặc trái thuần phong mỹ tục. 
• Giữ tinh thần xây dựng và báo cáo các nội dung không phù hợp. 
Chúng tôi mong muốn cùng bạn xây dựng một cộng đồng đọc truyện văn minh, sáng tạo và công bằng.`,
    },
    support: {
      title: "Hỗ Trợ",
      body: `
Bạn gặp vấn đề khi đăng nhập, thanh toán, hay đọc truyện? 
Đừng lo – đội ngũ hỗ trợ InkRealm luôn sẵn sàng giúp bạn! 
• Gửi yêu cầu qua mục “Trung tâm Hỗ Trợ”. 
• Hoặc liên hệ trực tiếp qua email: support@inkrealm.vn. 
Chúng tôi cam kết phản hồi nhanh chóng trong vòng 24 giờ làm việc để bạn có trải nghiệm liền mạch nhất.`,
    },
    contact: {
      title: "Liên Hệ",
      body: `
InkRealm luôn hoan nghênh mọi đóng góp, hợp tác và phản hồi từ độc giả, tác giả và đối tác. 
📍 Văn phòng đại diện: FPT University, TP. Hồ Chí Minh, Việt Nam. 
📧 Email: contact@inkrealm.vn 
📞 Hotline: (+84) 901 711 899 
Hãy cùng chúng tôi kiến tạo tương lai đọc truyện trực tuyến — sáng tạo, nhân văn và bền vững.`,
    },
  };

  return (
    <header className="bg-white text-gray-900 shadow-md sticky top-0 z-50
                   dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6 relative">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link
            to="/HomeLoggedIn"
            className="flex items-center gap-2 text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
          >
            INKREALM
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 whitespace-nowrap flex-shrink-0 relative">
          {Object.keys(contentMap).map((key) => (
            <div
              key={key}
              className="relative group"
              onMouseEnter={() => setHoveredItem(key)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="text-sm font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
                {contentMap[key].title}
              </span>

              {hoveredItem === key && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 
                             bg-white text-gray-800 shadow-xl rounded-xl p-4 border border-gray-200 
                             dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 
                             z-50 animate-fadeIn backdrop-blur-sm"
                >
                  <h3 className="text-base font-bold text-blue-600  dark:text-blue-400 mb-1">
                    {contentMap[key].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 text-wrap whitespace-pre-line">
                    {contentMap[key].body}
                  </p>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* SEARCH */}
        <div className="flex-1 min-w-0">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm truyện, thể loại, tác giả..."
                className="w-full min-w-0 rounded-full border border-gray-300 bg-gray-100 text-sm px-4 pr-10 py-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500
                           dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* USER ACTIONS */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          <Link to="/Profile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user avatar"
              className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer hover:opacity-80"
            />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}