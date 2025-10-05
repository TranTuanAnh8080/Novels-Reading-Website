import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MoHeader = () => {
    const navigate = useNavigate();
    const [modalContent, setModalContent] = useState(null);
    const [hoverContent, setHoverContent] = useState(null);

    const contentMap = {
        about: {
            title: "Về Chúng Tôi",
            body: "InkRealm là nền tảng đọc truyện SaaS, nơi công nghệ gặp gỡ nghệ thuật kể chuyện. Chúng tôi cung cấp một trải nghiệm đọc cá nhân hóa, không gián đoạn, tối ưu hóa trên mọi thiết bị. Sứ mệnh của chúng tôi là tạo ra một không gian minh bạch, tôn trọng bản quyền, và là bệ phóng cho các tác giả Việt Nam.",
        },
        policy: {
            title: "Chính Sách",
            body: "Chính sách của InkRealm tập trung vào bảo mật dữ liệu tuyệt đối cho độc giả và tác giả. Chúng tôi cam kết bảo vệ thông tin cá nhân và quyền sở hữu trí tuệ, đồng thời duy trì một môi trường nội dung lành mạnh, tích cực, tuân thủ nghiêm ngặt pháp luật Việt Nam.",
        },
        rules: {
            title: "Quy Định",
            body: "Để xây dựng một InkRealm vững mạnh, mọi thành viên cần tuân thủ Nguyên Tắc Vàng: Tôn trọng nhau, sử dụng ngôn ngữ văn minh và không đăng tải nội dung vi phạm bản quyền hoặc thuần phong mỹ tục. Vi phạm sẽ được xử lý bằng các biện pháp minh bạch và công bằng.",
        },
        support: {
            title: "Hỗ Trợ ",
            body: "Bạn gặp lỗi đăng nhập, sự cố giao diện, hay thắc mắc về tính năng? Đội ngũ hỗ trợ  của chúng tôi luôn sẵn sàng. Vui lòng gửi yêu cầu chi tiết tại mục 'Gửi Yêu Cầu Hỗ Trợ' hoặc liên hệ nhanh qua email: support@inkrealm.vn. Chúng tôi sẽ phản hồi trong vòng 24 giờ!",
        },
        contact: {
            title: "Liên Hệ",
            body: "InkRealm luôn mở cửa cho các cơ hội hợp tác xuất bản và truyền thông. Văn phòng đại diện: Hà Nội, Việt Nam. Email: contact@inkrealm.vn. Hotline: (+84) 901 711 899. Hãy cùng nhau kiến tạo tương lai của việc đọc truyện trực tuyến nhé!",
        },
    };

    const openModal = (type) => {
        setModalContent(contentMap[type]);
    };

    const closeModal = () => setModalContent(null);

    // Hàm xử lý hover: Sử dụng TOÀN BỘ BODY và TITLE
    const handleMouseEnter = (type) => {
        setHoverContent(contentMap[type]);
    };

    const handleMouseLeave = () => {
        setHoverContent(null);
    };

    // Hàm kiểm tra xem nội dung nào đang được hover để hiển thị Tooltip
    const isHovering = (type) => hoverContent && hoverContent.title === contentMap[type].title;

    return (
        <header
            className="w-full flex items-center justify-between px-6 py-4 shadow-md fixed
                      top-0 z-30 bg-transparent backdrop-blur-xs"
        >
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
                <a
                    href="/ModeratorHomePage"
                    title="Trở về Dashboard Quản trị"
                    className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
                >
                    <span
                        className="text-2xl font-black tracking-widest uppercase 
                          text-transparent bg-clip-text 
                          bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 
                          drop-shadow-md transition-all duration-300 hover:scale-[1.02]"
                    >
                        INKREALM
                    </span>
                </a>
            </div>

            {/* Navigation (Sử dụng Tooltip/Popover khi hover) */}
            <nav className="hidden lg:flex items-center gap-10 text-gray-800 font-medium flex-grow justify-center mr-20 text-md dark:text-gray-200">

                {/* Hàm tạo nút Navigation */}
                {Object.keys(contentMap).map((key) => (
                    <div
                        key={key}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(key)} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            onClick={() => openModal(key)}
                            className="hover:text-violet-600 dark:hover:text-violet-400 transition duration-150 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-violet-500 after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {contentMap[key].title}
                        </button>

                        {/* Tooltip/Popover */}
                        {isHovering(key) && (
                            <div className="absolute top-full mt-4 w-96 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl z-40 transition-opacity duration-300 opacity-100 left-1/2 transform -translate-x-1/2 max-h-60 overflow-y-auto text-left">
                                <h4 className="text-lg font-bold text-violet-600 dark:text-violet-400 mb-2">
                                    {hoverContent.title}
                                </h4>
                                <p className="text-sm font-normal text-gray-700 dark:text-gray-200 leading-relaxed">
                                    {hoverContent.body}
                                </p>
                                {/* Arrow/Triangle */}
                                <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white dark:border-b-gray-800"></div>
                            </div>
                        )}
                    </div>
                ))}

            </nav>

            {/* User Profile */}
            <div
                className="flex items-center gap-4 flex-shrink-0"
                onClick={() => navigate("/ModeratorProfile")}
            >
                <div
                    className="w-10 h-10 rounded-full 
                        bg-gradient-to-br from-blue-800 via-blue-700 to-blue-800 
                        text-white flex items-center justify-center 
                        font-extrabold text-lg cursor-pointer 
                        shadow-lg shadow-violet-500/50 
                        transform hover:scale-[1.05] transition duration-300"
                    title="Menu tài khoản"
                >
                    M
                </div>
            </div>

            {/* Popup Modal */}
            {modalContent && (
                <div className="fixed inset-0 
                backdrop-blur-sm flex items-center justify-center z-50 p-3">
                    <div
                        className="bg-white dark:bg-gray-900 dark:text-gray-200
                        rounded-2xl shadow-2xl w-[95%] sm:w-[600px] max-h-[90vh] overflow-y-auto p-8 relative transition-all duration-300 transform scale-100 opacity-100"
                    >
                        <h2 className="text-2xl  font-bold text-violet-600 dark:text-violet-400 mb-4 text-center">
                            {modalContent.title}
                        </h2>
                        <p className="text-gray-700 italic dark:text-gray-300 leading-relaxed text-left space-y-3">
                            {modalContent.body}
                        </p>

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 text-2xl font-bold transition p-1"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default MoHeader;