import React, { useState, useEffect } from "react";
import FancyImages2 from "./FancyImages2";
import image from "../assets/inkrealm_logo.png";
import vietnamFlag from "../assets/vietnam_flag.png";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, AlertCircle } from "lucide-react";
import identify from "../assets/identify.png"
import email from "../assets/email.png"
import axios from "axios";
const RegisterPage = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [avatarPreview, setAvatarPreview] = useState(null); // Preview ảnh
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [toast, setToast] = useState({ type: '', message: '', visible: false });
    const navigate = useNavigate();
    // States cho form
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        avatar: null, // File avatar
    });
    // tắt confetti sau 8 giây
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);


    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Kiểm tra file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setToast({
                    type: 'error',
                    message: '❌ Ảnh không được vượt quá 5MB!',
                    visible: true
                });
                setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
                return;
            }

            // Kiểm tra định dạng file
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setToast({
                    type: 'error',
                    message: '❌ Chỉ chấp nhận file JPG, PNG, WEBP!',
                    visible: true
                });
                setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
                return;
            }

            setFormData(prev => ({
                ...prev,
                avatar: file
            }));

            // Tạo preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Validate form
    const validateForm = () => {

        if (!formData.username.trim() && !formData.password && !formData.fullName.trim() && !formData.email.trim()) {
            setToast({
                type: 'error',
                message: '❌ Vui lòng điền đầy đủ thông tin Đăng ký!',
                visible: true
            });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
            return false;
        }


        if (!formData.username.trim()) {
            setToast({ type: 'error', message: '❌ Vui lòng nhập Tên đăng nhập!', visible: true });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
            return false;
        }

        if (formData.username.length < 4) {
            setToast({ type: 'error', message: '❌ Tên đăng nhập phải có ít nhất 4 ký tự!', visible: true });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
            return false;
        }

        if (!/^[AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+ [AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+(?: [AÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪBCDĐEÈÉẸẺẼÊỀẾỆỂỄFGHIÌÍỊỈĨJKLMNOÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠPQRSTUÙÚỤỦŨƯỪỨỰỬỮVWXYỲÝỴỶỸZ][aàáạảãăằắặẳẵâầấậẩẫbcdđeèéẹẻẽêềếệểễfghiìíịỉĩjklmnoòóọỏõôồốộổỗơờớợởỡpqrstuùúụủũưừứựửữvwxyỳýỵỷỹz]+)*$/.test(formData.fullName.trim())) {
            setToast({ type: 'error', message: '❌ Vui lòng nhập đúng format Họ và Tên ( Nguyễn Văn A ) !', visible: true });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
            return false;
        }

        if (!formData.email.trim()) {
            setToast({ type: 'error', message: '❌ Vui lòng nhập đúng Email!', visible: true });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
            return false;
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setToast({ type: 'error', message: '❌ Email không hợp lệ, vui lòng kiểm tra lại!', visible: true });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
            return false;
        }

        if (!formData.password) {
            setToast({ type: 'error', message: '❌ Vui lòng nhập Mật khẩu!', visible: true });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
            return false;
        }

        if (formData.password.length < 6) {
            setToast({ type: 'error', message: '❌ Mật khẩu phải có ít nhất 6 ký tự!', visible: true });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
            return false;
        }



        return true;
    };

    // Xử lý đăng ký
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) return;

        setIsLoading(true);
        console.log("🔄 Đang gửi request đăng ký...");

        try {
            // Tạo FormData để gửi file
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username.trim());
            formDataToSend.append('password', formData.password);
            formDataToSend.append('fullName', formData.fullName.trim());
            formDataToSend.append('email', formData.email.trim());

            // Nếu có avatar thì thêm vào
            // if (formData.avatar) {
            //     formDataToSend.append('avatar', formData.avatar);
            // }

            const response = await axios.post(
                "https://be-ink-realm-c7jk.vercel.app/auth/register",
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 5000, // 5 giây
                }
            );

            if (response.status === 201 || response.status === 200) {
                const { message, token, user } = response.data;

                console.log("✅ Đăng ký thành công:", message);
                console.log("👤 Thông tin người dùng:", user);

                // 🔐 Lưu thông tin vào sessionStorage
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("accountId", user.accountId);

                // 🎯 Cài đặt header mặc định cho axios
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);

                // ✅ Toast thành công
                setToast({ type: "success", message: response.data.message, visible: true });
                setTimeout(() => setToast({ ...toast, visible: false }), 2000);


                setTimeout(() => {
                    navigate("/LoginPage", {
                        replace: true,
                        state: { user }
                    });
                }, 2000);
            }

        } catch (error) {
            console.error("❌ Lỗi đăng ký:", error);

            let message = "";
            if (error.response) {
                const status = error.response.status;
                const errorData = error.response.data;

                switch (status) {
                    case 400:
                        message = errorData?.message || "❌ Thông tin đăng ký không hợp lệ!";
                        break;
                    case 500:
                        message = "💥 Lỗi server! Vui lòng thử lại sau.";
                        break;
                    default:
                        message = errorData?.message || "❌ Đăng ký thất bại!";
                }
            } else if (error.request) {
                message = "❌ Không thể kết nối đến server!\nVui lòng kiểm tra kết nối mạng.";
            } else {
                message = "⚠️ Có lỗi xảy ra: " + error.message;
            }
            setToast({ type: "error", message, visible: true });
            setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-rose-50 via-sky-100 to-red-100">

            <AnimatePresence>
                {toast.visible && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className={`fixed top-6 left-1/2 transform -translate-x-1/2 
                       bg-white text-gray-800 
                       border-2 ${toast.type === 'success' ? 'border-green-300' : 'border-red-300'}
                       font-sans font-semibold 
                       px-5 py-3 rounded-xl
                       shadow-xl 
                       flex items-center gap-3 z-50 
                       min-w-[300px] max-w-[500px]`}
                    >
                        {/* Icon */}
                        {toast.type === 'success' ? (
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                        )}

                        {/* Nội dung thông báo */}
                        <p className="text-sm text-gray-700 flex-1">
                            {toast.message}
                        </p>

                        {/* Close button */}
                        <button
                            onClick={() => setToast(prev => ({ ...prev, visible: false }))}
                            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hiệu ứng pháo giấy */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={300}
                    recycle={false}
                />
            )}

            {/* left side - Form đăng ký */}
            <div className="w-1/2 h-full flex flex-col justify-center px-16">
                {/* Vietnam Flag */}
                <img
                    src={vietnamFlag}
                    alt="Vietnam Flag"
                    className="absolute top-3 left-4 w-17 h-auto 
                            contrast-125 brightness-150 saturate-150
                            scale-75 hover:scale-100 transition-transform duration-300"
                />

                {/* Logo Inkrealm */}
                <img
                    src={image}
                    alt="Inkrealm Logo"
                    className="mt-3 mr-36 w-35 h-14 contrast-150 brightness-100 saturate-200 mx-auto"
                />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-6 flex flex-col items-center">
                        <div className="relative mt-2">
                            <div className="w-20 h-20 rounded-full border-4 border-blue-400 overflow-hidden bg-gray-100 flex items-center justify-center shadow-lg">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <label
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 ml-2 bg-blue-700 text-white p-2 rounded-xl cursor-pointer hover:bg-blue-600 transition shadow-md"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                                disabled={isLoading}
                            />
                        </div>
                        <p className="text-md font-medium text-gray-700">Ảnh đại diện</p>
                        <p className="text-xs text-gray-600">JPG, PNG, JPEG, WEBP (Max 5MB)</p>
                    </div>

                    {/* Tên đăng nhập */}
                    <div className="mb-3">
                        <label className="block text-gray-700 font-medium mb-2 text-md">
                            Tên Đăng Nhập<strong className="text-red-500">*</strong>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Nhập tên đăng nhập"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <span className="absolute right-3 top-2 text-gray-500 text-md">
                                ⭐
                            </span>

                        </div>
                    </div>

                    {/* Họ và Tên */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Họ và Tên<strong className="text-red-500">*</strong>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Nhập họ và tên của bạn"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <img
                                src={identify}
                                alt="identify"
                                className="absolute right-3 top-2 w-5 h-5 object-contain"
                            />

                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Email<strong className="text-red-500">*</strong>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Nhập địa chỉ email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />

                            <img
                                src={email}
                                alt="email"
                                className="absolute right-3 top-2 w-5 h-5 object-contain"
                            />
                        </div>

                    </div>

                    {/* Mật khẩu */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Mật khẩu<strong className="text-red-500">*</strong>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Nhập mật khẩu (Tối thiểu 6 ký tự)"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-gray-500 text-md hover:text-gray-700"
                            >
                                {showPassword ? "🙈" : "👀"}
                            </button>
                        </div>
                    </div>

                    {/* Nút đăng ký */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-65 bg-gradient-to-br from-blue-100 via-red-300 to-purple-500
                         text-white py-2 rounded-3xl hover:bg-blue-600
                         transition duration-300 justify-center
                         flex items-center mx-auto mb-4 font-bold hover:scale-105 transform ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Đang xử lý...
                            </span>
                        ) : (
                            'Đăng Ký'
                        )}
                    </button>

                    {/* Đã có tài khoản */}
                    <div className="text-center mb-2">
                        <p className="text-gray-600 font-medium">Bạn đã có tài khoản?</p>
                        <Link to="/LoginPage" className="text-blue-600 font-bold">
                            Đăng Nhập
                        </Link>
                    </div>
                </form>
            </div>
            {/* Right side - FancyImages2 */}
            <FancyImages2 />

        </div>
    );

};

export default RegisterPage;