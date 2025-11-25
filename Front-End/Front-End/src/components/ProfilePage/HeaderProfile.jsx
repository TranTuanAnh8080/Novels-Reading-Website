import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/inkrealm_logo.png";

export default function HeaderProfile({ userData }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  // ✅ Lấy thông tin người dùng từ props hoặc sessionStorage
  const user = userData || JSON.parse(sessionStorage.getItem("user") || "{}");
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // ✅ Dữ liệu hover nội dung
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
    <header className="bg-gradient-to-r from-[#0a0f1e] via-[#0a0f1e] to-[#0f172a] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link
            to="/HomeLoggedIn"
            className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
          >
            INKREALM
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-8 relative z-40">
          {Object.keys(contentMap).map((key) => (
            <div
              key={key}
              className="relative group"
              onMouseEnter={() => setHoveredItem(key)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors">
                {contentMap[key].title}
              </span>

              {hoveredItem === key && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 
              bg-gray-800/95 text-gray-100 shadow-xl rounded-xl p-4 border border-gray-700 
              backdrop-blur-md animate-fadeIn"
                >
                  <h3 className="text-base font-semibold text-blue-400 mb-1">
                    {contentMap[key].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
                    {contentMap[key].body}
                  </p>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* GREETING + AVATAR */}
        <div className="flex items-center gap-3">
          <Link to="/Profile" className="flex items-center gap-2">
            <span className="text-sm text-gray-200">
              Xin chào,&nbsp;
              <span className="font-semibold text-white">
                {user.fullName || "Người dùng"}
              </span>
            </span>
            <img
              src={user.avatar || defaultAvatar}
              alt="avatar"
              className="w-9 h-9 rounded-full border border-gray-700 object-cover hover:scale-105 transition-transform"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />
          </Link>
        </div>
      </div>

      <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.25s ease-out;
    }
  `}</style>
    </header>
  );
}
