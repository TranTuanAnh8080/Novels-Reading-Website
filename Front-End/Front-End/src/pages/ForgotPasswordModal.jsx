import React, { useState } from "react";
import image from "../assets/inkrealm_logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ForgotPasswordModal = () => {
    const [showMessage, setShowMessage] = useState(false);

    const handleSendRequest = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            window.location.href = "/LoginPage";
        }, 1700);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-cyan-200 via-transparent to-rose-200 bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-transparent rounded-2xl shadow-2xl w-full max-w-md p-8 font-mono"
            >
                {/* Tiêu đề */}
                <div className="text-center mb-6 ">
                    <img
                        src={image}
                        alt="Inkrealm Logo"
                        className="ml-25 mb-4 w-40 h-15 mx-auto contrast-125 brightness-90 saturate-150"
                    />
                    <p className="text-gray-600 mt-2">
                        Vui lòng nhập Email & Số điện thoại để khôi phục mật khẩu.
                    </p>
                </div>

                {/* Form Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Email <strong className="text-red-500">*</strong>
                    </label>
                    <input
                        type="email"
                        placeholder="Nhập địa chỉ email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                </div>

                {/* Form Số điện thoại */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Số Điện Thoại <strong className="text-red-500">*</strong>
                    </label>
                    <input
                        type="tel"
                        placeholder="Nhập số điện thoại của bạn"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                {/* Nút hành động */}
                <div className="flex justify-between mt-4">
                    <button
                        className="px-4 py-2 rounded-lg text-black font-light bg-red-200 hover:scale-105 transition duration-300"
                        onClick={() => window.location.href = "/LoginPage"}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSendRequest}
                        className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:scale-105 transition duration-300"
                    >
                        Gửi yêu cầu
                    </button>
                </div>
            </motion.div>

            {/* Thông báo */}
            {showMessage && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }} // Thêm scale để animation mượt mà hơn
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-6 left-1/2 transform -translate-x-1/2 
                       
                       bg-white text-gray-800 
                       border border-indigo-200 
                       font-sans font-semibold 
                       px-5 py-3 rounded-xl
                       shadow-xl 
                       flex items-center gap-3 z-50 
                       min-w-[300px]" // Thiết lập kích thước tối thiểu
                    >
                        {/* Sử dụng màu xanh chủ đạo cho Icon */}
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />

                        {/* Nội dung thông báo */}
                        <p className="text-md text-gray-700">
                            Link khôi phục đã được gửi thành công! Vui lòng kiểm tra email của bạn.
                        </p>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default ForgotPasswordModal;