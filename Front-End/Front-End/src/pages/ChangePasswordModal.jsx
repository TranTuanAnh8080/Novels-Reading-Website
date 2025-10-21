import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, CheckCircle, AlertCircle, RefreshCcw } from 'lucide-react'; // Sử dụng RefreshCcw cho Old Password
import image from "../assets/inkrealm_logo.png";
import axios from 'axios';
import { useDarkMode } from "../pages/DarkModeContext";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

const ChangePasswordModal = () => {

    const { darkMode, setDarkMode } = useDarkMode();
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
        <div
            className={`fixed inset-0 flex justify-center items-center z-50 p-4 transition-colors 
        ${darkMode
                    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900"
                    : "bg-gradient-to-br from-cyan-100 via-transparent to-rose-100"
                }`}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`
          w-full max-w-lg rounded-3xl p-8 shadow-2xl border
          ${darkMode
                        ? "bg-gray-800/90 border-gray-700 text-gray-100"
                        : "bg-white border-gray-200 text-gray-800"
                    }`}
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <img
                        src={image}
                        alt="Inkrealm Logo"
                        className="mb-2 w-40 mr-37 mx-auto contrast-125 brightness-110 saturate-150"
                    />
                    <h2 className="text-xl font-bold mb-2">Đổi mật khẩu?</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        Vui lòng nhập đầy đủ thông tin để thực hiện yêu cầu này.
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-5">
                    {[
                        { label: "Mật khẩu cũ", value: oldPassword, setter: setOldPassword, show: showOldPassword, toggle: setShowOldPassword, placeholder: "Nhập mật khẩu cũ" },
                        { label: "Mật khẩu mới", value: newPassword, setter: setNewPassword, show: showNewPassword, toggle: setShowNewPassword, placeholder: "Nhập mật khẩu mới" },
                        { label: "Xác nhận mật khẩu mới", value: confirmPassword, setter: setConfirmPassword, placeholder: "Nhập lại mật khẩu mới", noToggle: true },
                    ].map((field, i) => (
                        <div key={i}>
                            <label className="block font-medium mb-2 text-sm">
                                {field.label} <strong className="text-red-500">*</strong>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type={field.show ? "text" : "password"}
                                    value={field.value}
                                    onChange={(e) => field.setter(e.target.value)}
                                    placeholder={field.placeholder}
                                    className={`w-full pl-10 pr-12 py-3 rounded-xl border transition duration-200 focus:ring-2
                    ${darkMode
                                            ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
                                            : "bg-white border-gray-300 focus:ring-blue-500 text-gray-800"
                                        }`}
                                    disabled={isLoading}
                                />
                                {!field.noToggle && (
                                    <button
                                        type="button"
                                        onClick={() => field.toggle((p) => !p)}
                                        className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2"
                                    >
                                        {field.show ? "🙈" : "👀"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8 gap-3">
                    <button
                        className={`flex-1 px-4 py-3 rounded-xl font-medium transition duration-300
              ${darkMode
                                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                : "bg-red-200 text-gray-700 hover:bg-red-300"
                            }`}
                        onClick={() => (window.location.href = "/Profile")}
                        disabled={isLoading}
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className={`flex-1 px-4 py-3 rounded-xl font-medium flex items-center justify-center transition duration-300 shadow-lg
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
              ${darkMode
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-cyan-500 text-white hover:bg-cyan-600"
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                    5.291A7.962 7.962 0 014 12H0c0 3.042 
                    1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Đang xử lý...
                            </>
                        ) : (
                            "Đổi mật khẩu"
                        )}
                    </button>
                </div>

                {/* Ghi chú */}
                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300 font-medium">
                    <Lock className="inline w-4 h-4 mr-1 mb-0.5 text-blue-500" />
                    Thay đổi này sẽ có hiệu lực ngay lập tức.
                </div>
            </motion.div>

            {/* Toast */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className={`fixed top-6 left-1/2 transform -translate-x-1/2 
              px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50
              min-w-[300px] max-w-[500px] border-2
              ${darkMode
                                ? "bg-gray-800 text-gray-100"
                                : "bg-white text-gray-800"
                            }
              ${messageType === "success"
                                ? "border-green-400"
                                : "border-red-400"
                            }`}
                    >
                        {messageType === "success" ? (
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        )}
                        <p className="text-sm flex-1 text-center">{messageText}</p>
                        <button
                            onClick={() => setShowMessage(false)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
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
        </div>
    );
};

export default ChangePasswordModal;