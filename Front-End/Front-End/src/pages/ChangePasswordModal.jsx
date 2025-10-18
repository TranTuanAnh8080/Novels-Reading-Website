import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, CheckCircle, AlertCircle, RefreshCcw } from 'lucide-react'; // Sử dụng RefreshCcw cho Old Password
import image from "../assets/inkrealm_logo.png";
import axios from 'axios';

const ChangePasswordModal = () => {
    // States for input fields
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // States for UI feedback
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState('success'); // 'success' hoặc 'error'
    const [messageText, setMessageText] = useState('');

    // State to track if component is mounted to prevent state updates after unmount
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Password validation logic
    const validatePasswords = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            return { valid: false, message: '❌ Vui lòng điền đầy đủ 3 trường mật khẩu.' };
        }
        if (newPassword.length < 6) {
            return { valid: false, message: '❌ Mật khẩu mới phải có ít nhất 6 ký tự.' };
        }
        if (newPassword !== confirmPassword) {
            return { valid: false, message: '❌ Mật khẩu mới và Xác nhận mật khẩu không khớp!' };
        }
        if (oldPassword === newPassword) {
            return { valid: false, message: '❌ Mật khẩu mới phải khác mật khẩu cũ.' };
        }
        return { valid: true };
    };

    // Helper function to display toast message
    const showToast = (type, text, duration = 3000) => {
        if (isMounted) {
            setMessageType(type);
            setMessageText(text);
            setShowMessage(true);
            setTimeout(() => {
                if (isMounted) setShowMessage(false);
            }, duration);
        }
    };

    // Handle the password change request
    const handleChangePassword = async () => {
        const validationResult = validatePasswords();
        if (!validationResult.valid) {
            showToast('error', validationResult.message, 2500);
            return;
        }

        if (isLoading) return;

        setIsLoading(true);

        try {
            // Lấy token từ sessionStorage
            const token = sessionStorage.getItem('token');

            if (!token) {
                showToast('error', '❌ Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 3000);
                setTimeout(() => {
                    window.location.href = "/LoginPage";
                }, 2000);
                return;
            }

            const response = await axios.post(
                'https://be-ink-realm-c7jk.vercel.app/auth/change-password',
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    timeout: 10000 // 10 giây
                }
            );

            // ✅ Đổi mật khẩu thành công
            if (response.status === 200 || response.status === 201) {
                console.log('✅ Đổi mật khẩu thành công:', response.data);

                console.log('✅ Response data:', response.data); // Xem chi tiết response
                console.log('✅ Account ID:', response.data?.accountId); // Kiểm tra ID

                showToast('success', 'Đổi mật khẩu thành công! Bạn sẽ được đăng xuất để đăng nhập lại.', 5000);

                // Xóa token và chuyển về trang login sau 3 giây
                setTimeout(() => {
                    if (isMounted) {
                        sessionStorage.removeItem('token');
                        window.location.href = "/LoginPage";
                    }
                }, 3000);
            }

            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('🔍 Token payload:', payload);
            console.log('🔍 Account ID in token:', payload.accountId);

        } catch (error) {
            console.error('❌ Lỗi đổi mật khẩu:', error);

            console.error('Cannot decode token:', error);

            let errorMessage = '';

            if (error.response) {
                const status = error.response.status;
                const errorData = error.response.data;

                switch (status) {
                    case 400:
                        // Mật khẩu cũ sai hoặc mật khẩu mới không hợp lệ
                        errorMessage = errorData?.message || '❌ Mật khẩu cũ không đúng hoặc thiếu dữ liệu.';
                        break;
                    case 401:
                        errorMessage = errorData?.message || '❌ Token không hợp lệ hoặc chưa đăng nhập.';
                        break;
                    case 403:
                        // Token hết hạn hoặc không hợp lệ
                        errorMessage = '❌ Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
                        setTimeout(() => {
                            sessionStorage.removeItem('token');
                            window.location.href = "/LoginPage";
                        }, 2000);
                        break;
                    case 404:
                        errorMessage = errorData?.message || '❌ Không tìm thấy người dùng';
                        break;
                    case 500:
                        errorMessage = '💥 Lỗi server! Vui lòng thử lại sau.';
                        break;
                    default:
                        errorMessage = errorData?.message || `❌ Lỗi ${status}: Không thể thay đổi mật khẩu.`;
                }
            } else if (error.request) {
                errorMessage = '❌ Không thể kết nối đến server! Vui lòng kiểm tra kết nối mạng.';
            } else {
                errorMessage = '⚠️ Có lỗi xảy ra: ' + error.message;
            }

            showToast('error', errorMessage, 4000);

        } finally {
            if (isMounted) setIsLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleChangePassword();
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-cyan-200 via-transparent to-rose-200 bg-opacity-70 flex justify-center items-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-4xl shadow-md w-full max-w-lg p-8"
            >
                {/* Tiêu đề */}
                <div className="text-center mb-6">
                    {/* Placeholder for Logo */}
                    <img
                        src={image}
                        alt="Inkrealm Logo"
                        className="mb-2 w-40 mr-38 h-15 mx-auto contrast-150 brightness-105 saturate-150"
                    />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Đổi mật khẩu?</h2>
                    <p className="text-gray-600 mt-2">
                        Vui lòng nhập đầy đủ thông tin để thực hiện yêu cầu này.
                    </p>
                </div>

                {/* Form Inputs */}
                <div className="space-y-5">
                    {/* Mật khẩu cũ */}
                    <div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">
                                Mật khẩu cũ <strong className="text-red-500">*</strong>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu cũ của bạn"
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(prev => !prev)}
                                    className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 px-2"
                                    aria-label={showOldPassword ? "Hide old password" : "Show old password"}
                                >
                                    {showOldPassword ? "🙈" : "👀"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mật khẩu mới */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Mật khẩu mới <strong className="text-red-500">*</strong>
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Mật khẩu mới (Tối thiểu 6 ký tự)"
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(prev => !prev)}
                                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 px-2"
                                aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                            >
                                {showNewPassword ? "🙈" : "👀"}
                            </button>
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu mới */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Xác nhận mật khẩu mới <strong className="text-red-500">*</strong>
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Nhập lại mật khẩu mới"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* Nút hành động */}
                <div className="flex justify-between mt-8 gap-3">
                    <button
                        className="flex-1 px-4 py-3 rounded-xl text-gray-700 font-medium bg-red-200 hover:bg-red-300 hover:scale-[1.02] transition duration-300 shadow-xs"
                        onClick={() => window.location.href = "/Profile"} // Quay lại trang profile/home
                        disabled={isLoading}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className={`flex-1 px-4 py-3 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600 hover:scale-[1.02] transition duration-300 shadow-lg flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Đang xử lý...
                            </>
                        ) : (
                            'Đổi Mật Khẩu'
                        )}
                    </button>
                </div>

                {/* Thông tin bổ sung */}
                <div className="mt-6 text-center text-sm text-gray-600 font-bold">
                    <Lock className="inline w-4 h-4 mr-1 mb-0.5 text-blue-500" />
                    Thay đổi này sẽ có hiệu lực ngay lập tức.
                </div>
            </motion.div>

            {/* Thông báo Toast */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className={`fixed top-6 left-1/2 transform -translate-x-1/2 
                            bg-white text-gray-800 
                            border-2 ${messageType === 'success' ? 'border-green-400' : 'border-red-400'}
                            font-sans font-semibold 
                            px-5 py-3 rounded-xl
                            shadow-2xl 
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
                        <p className="text-sm text-gray-700 font-medium text-center w-full break-words whitespace-normal">
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

export default ChangePasswordModal;