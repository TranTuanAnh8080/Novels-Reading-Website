import React, { useState } from "react";
import image from "../assets/inkrealm_logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, AlertCircle  } from "lucide-react";
import axios from "axios";

const ForgotPasswordModal = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('success'); // 'success' hoặc 'error'
    const [messageText, setMessageText] = useState('');

    // Validate email
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Handle send reset password request
    const handleSendRequest = async () => {
        // Validate email trước khi gửi
        if (!email.trim()) {
            setMessageType('error');
            setMessageText('❌ Vui lòng nhập địa chỉ email!');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            return;
        }

        if (!validateEmail(email)) {
            setMessageType('error');
            setMessageText('❌ Email không hợp lệ! Vui lòng kiểm tra lại.');
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            return;
        }

        setIsLoading(true);
        console.log('🔄 Đang gửi yêu cầu reset password...');

        try {
            const response = await axios.post(
                'https://be-ink-realm-c7jk.vercel.app/auth/reset-password',
                {
                    email: email.trim()
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000, // 10 giây
                }
            );

            // ✅ Gửi thành công
            if (response.status === 200 || response.status === 201) {
                console.log('✅ Reset password thành công:', response.data);
                
                setMessageType('success');
                setMessageText('✅ Link khôi phục đã được gửi thành công! Vui lòng kiểm tra email của bạn.');
                setShowMessage(true);

                // Chuyển về trang login sau 2.5 giây
                setTimeout(() => {
                    setShowMessage(false);
                    window.location.href = "/LoginPage";
                }, 2500);
            }

        } catch (error) {
            console.error('❌ Lỗi reset password:', error);

            let errorMessage = '';

            if (error.response) {
                const status = error.response.status;
                const errorData = error.response.data;

                switch (status) {
                    case 400:
                        errorMessage = '❌ Email không hợp lệ!';
                        break;
                    case 404:
                        errorMessage = '❌ Email không tồn tại trong hệ thống!';
                        break;
                    case 429:
                        errorMessage = '⏰ Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 5 phút.';
                        break;
                    case 500:
                        errorMessage = '💥 Lỗi server! Vui lòng thử lại sau.';
                        break;
                    default:
                        errorMessage = errorData?.message || '❌ Gửi yêu cầu thất bại!';
                }
            } else if (error.request) {
                errorMessage = '❌ Không thể kết nối đến server! Vui lòng kiểm tra kết nối mạng.';
            } else {
                errorMessage = '⚠️ Có lỗi xảy ra: ' + error.message;
            }

            setMessageType('error');
            setMessageText(errorMessage);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3500);

        } finally {
            setIsLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSendRequest();
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-cyan-200 via-transparent to-rose-200 bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 font-mono"
            >
                {/* Tiêu đề */}
                <div className="text-center mb-6">
                    <img
                        src={image}
                        alt="Inkrealm Logo"
                        className="mb-2 w-40 mr-29 h-15 mx-auto contrast-150 brightness-105 saturate-150"
                    />
                    <h2 className="text-xl font-medium text-gray-800 mb-2">Quên mật khẩu?</h2>
                    <p className="text-gray-600 mt-2 font-medium">
                        Vui lòng nhập Email để khôi phục mật khẩu.
                    </p>
                </div>

                {/* Form Email */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Email <strong className="text-red-500">*</strong>
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="example@email.com"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            disabled={isLoading}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Mật khẩu mới sẽ được gửi đến email này
                    </p>
                </div>

                {/* Nút hành động */}
                <div className="flex justify-between mt-6 gap-3">
                    <button
                        className="flex-1 px-4 py-2 rounded-lg text-black font-medium bg-red-200 hover:bg-red-300 hover:scale-105 transition duration-300"
                        onClick={() => window.location.href = "/LoginPage"}
                        disabled={isLoading}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSendRequest}
                        disabled={isLoading}
                        className={`flex-1 px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 hover:scale-105 transition duration-300 flex items-center justify-center ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Đang gửi...
                            </>
                        ) : (
                            'Gửi yêu cầu'
                        )}
                    </button>
                </div>

                {/* Thông tin bổ sung */}
                <div className="mt-6 text-center ">
                    <p className="text-sm text-gray-600 ">
                        Nhớ mật khẩu?{' '}
                        <a href="/LoginPage" className="text-blue-600 font-bold hover:text-blue-700">
                            Đăng Nhập Ngay!
                        </a>
                    </p>
                </div>
            </motion.div>

            {/* Thông báo Toast */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className={`fixed top-6 left-1/2 transform -translate-x-1/2 
                       bg-white text-gray-800 
                       border-2 ${messageType === 'success' ? 'border-green-300' : 'border-red-300'}
                       font-sans font-semibold 
                       px-5 py-3 rounded-xl
                       shadow-xl 
                       flex items-center gap-3 z-50 
                       min-w-[300px] max-w-[500px]`}
                    >
                        {/* Icon */}
                        {messageType === 'success' ? (
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        )}

                        {/* Nội dung thông báo */}
                        <p className="text-sm text-gray-700">
                            {messageText}
                        </p>

                        {/* Close button */}
                        <button
                            onClick={() => setShowMessage(false)}
                            className="ml-auto text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ForgotPasswordModal;