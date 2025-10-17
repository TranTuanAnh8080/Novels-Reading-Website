import React, { useState, useEffect } from "react";
import image from "../assets/inkrealm_logo.png";
import vietnamFlag from "../assets/vietnam_flag.png";
import Confetti from "react-confetti";
import FancyImages from "./FancyImages";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, AlertCircle } from "lucide-react";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showConfetti, setShowConfetti] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState({ type: "", message: "", visible: false });
    const [showSuccess, setShowSuccess] = useState(false); // Thêm state cho toast
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Show toast helper function
    const showToast = (type, message, duration = 3000) => {
        setToast({ visible: true, type, message });
        setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
        }, duration);
    };

    // Xử lý đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!username.trim() || !password) {
            showToast('error', '❌ Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        setIsLoading(true);
        console.log("🔄 Đang gửi request đăng nhập...");

        try {
            const response = await axios.post(
                "https://be-ink-realm-c7jk.vercel.app/auth/login",
                {
                    username: username.trim(),
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    timeout: 10000, // 10 giây
                }
            );

            if (response.status === 200) {
                const { message, token, user } = response.data;

                console.log("✅ Đăng nhập thành công:", message);
                console.log("👤 Thông tin người dùng:", user);

                // Lưu thông tin đăng nhập
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("accountId", user.accountId);

                window.dispatchEvent(new Event("loginStateChanged"));

                // Set axios default header
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                // Show success animation
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);

                // Show success toast
                showToast('success', `Chào mừng ${user.fullName} đến với InkRealm! ⭐`, 2000);

                // Redirect after 1.5s
                setTimeout(() => {
                    navigate("/HomeLoggedIn", { replace: true, state: { user } });
                }, 1500);
            }
        } catch (error) {
            console.error("❌ Lỗi đăng nhập:", error);

            let message = "";

            if (error.response) {
                const status = error.response.status;
                switch (status) {
                    case 400:
                    case 401:
                        message = "❌ Sai tên đăng nhập hoặc mật khẩu!";
                        break;
                    case 403:
                        message = "🚫 Tài khoản bị khóa hoặc không có quyền truy cập!";
                        break;
                    case 500:
                        message = "💥 Lỗi server! Vui lòng thử lại sau.";
                        break;
                    default:
                        message = error.response.data?.message || "❌ Đăng nhập thất bại!";
                }
            } else if (error.request) {
                message = "❌ Không thể kết nối đến server! Vui lòng kiểm tra kết nối mạng.";
            } else {
                message = "⚠️ Có lỗi xảy ra: " + error.message;
            }

            showToast('error', message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex h-screen bg-gradient-to-br from-white via-sky-100 to-red-100 
        flex-row">

            {/* Toast Notification với Animation */}
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


            <FancyImages />

            {/* Hiệu ứng pháo giấy */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={300}
                    recycle={false}
                />
            )}

            <img
                src={vietnamFlag}
                alt="Vietnam Flag"
                className="absolute top-3 right-4 w-15 h-auto 
          contrast-125 brightness-150 saturate-150
          scale-75 hover:scale-100 transition-transform duration-300"
            />

            <div className="w-auto flex flex-col justify-center px-16 mt-4">
                {/* Logo Inkrealm */}
                <img
                    src={image}
                    alt="Inkrealm Logo"
                    className="mb-3 w-40 h-15 contrast-125 brightness-90 saturate-200"
                />
                <p className="text-gray-600 mb-3 text-2xl font-medium ">
                    Khám phá thế giới truyện <br /> đa sắc màu cùng chúng tôi ❤️
                </p>

                {/* Form đăng nhập */}
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-3 mt-5">
                        <label className="block text-gray-600 font-medium text-md mb-2">Tên Đăng Nhập<strong className="text-red-600">*</strong></label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nhập tên đăng nhập của bạn"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                required
                            />
                            <span className="absolute right-3 top-2 text-gray-500 text-md">
                                ⭐
                            </span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="block text-gray-600 font-medium text-md mb-2">Mật Khẩu<strong className="text-red-600">*</strong></label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu của bạn"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                                required
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

                    {/* Nút đăng nhập */}
                    <button
                        type="submit"
                        disabled={isLoading || showSuccess}
                        className={`w-65 bg-gradient-to-br ${isLoading || showSuccess
                            ? 'from-blue-200 via-rose-300 to-purple-300 cursor-not-allowed'
                            : 'from-blue-100 via-red-300 to-purple-500 hover:bg-blue-600 hover:scale-105'
                            } text-white py-2 rounded-3xl transition duration-300 justify-center flex items-center mx-auto mb-4 font-bold transform mt-7`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Đang đăng nhập...
                            </div>
                        ) : showSuccess ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Đang điều hướng...
                            </div>
                        ) : (
                            'Đăng Nhập'
                        )}
                    </button>
                </form>

                {/* Nút Test DB */}
                {/* <button
                    type="button"
                    onClick={async () => {
                        try {
                            const response = await axios.get("https://be-ink-realm-c7jk.vercel.app/test/test-db", {
                                headers: {
                                    "accept": "application/json",
                                },
                            });

                            if (response.status === 200) {
                                alert(`✅ Kết nối thành công: ${response.data.message}`);
                                console.log("🔄 Response từ server:", response.data);
                            }
                        } catch (error) {
                            console.error("❌ Lỗi kết nối DB:", error);
                            alert("❌ Không thể kết nối đến server!\nVui lòng kiểm tra backend hoặc kết nối mạng.");
                        }
                    }}
                    className="w-65 bg-gradient-to-br from-green-100 via-green-300 to-green-500 text-white py-2 rounded-3xl hover:bg-green-600
    transition duration-300 justify-center flex items-center mx-auto mb-4 font-bold hover:scale-105 transform mt-3"
                >
                    Test DB
                </button> */}


                {/* Quên mật khẩu */}
                <div className="text-center mb-2">
                    <a
                        href="/ForgotPasswordModal"
                        className="text-blue-600 font-bold"
                    >
                        Quên mật khẩu?
                    </a>
                </div>

                {/* Đăng nhập với Google */}
                <div className="mt-4 rounded-4xl flex justify-center items-center">
                    <button
                        type="button"
                        className="w-100 h-auto flex items-center justify-center bg-white border
                border-gray-300 py-2 rounded-3xl hover:bg-gray-100 
                transition duration-300"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google Logo"
                            className="w-5 h-5 mr-2"
                        />
                        Đăng nhập với Google
                    </button>
                </div>

                {/* Tạo tài khoản */}
                <div className="text-center mt-6">
                    <p className="text-gray-600 font-medium">
                        Bạn chưa có tài khoản?
                    </p>
                    <a
                        href="/RegisterPage"
                        className="text-blue-600 font-bold"
                    >
                        Đăng Ký Ngay
                    </a>
                </div>


                <div />
            </div>
        </div>
    );
};

export default LoginPage;
