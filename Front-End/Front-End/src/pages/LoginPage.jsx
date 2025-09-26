import React, { useState, useEffect } from "react";
import image from "../assets/inkrealm_logo.png";
import vietnamFlag from "../assets/vietnam_flag.png";
import Confetti from "react-confetti";
import FancyImages from "./FancyImages";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // tắt confetti sau 5 giây
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Xử lý đăng nhập
    const handleSubmit = (e) => {
        e.preventDefault(); // ngăn reload
        console.log("✅ Login clicked");

        // TODO: gọi API login check tài khoản ở đây
        // Nếu login ok thì navigate sang HomePage
        navigate("/HomePage");
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-white via-sky-100 to-red-100 flex-row">
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

            <div className="w-auto flex flex-col justify-center px-16 mt-4 font-mono">
                {/* Logo Inkrealm */}
                <img
                    src={image}
                    alt="Inkrealm Logo"
                    className="mb-3 w-42 h-17 contrast-125 brightness-90 saturate-200"
                />
                <p className="text-gray-600 mb-3 text-2xl font-mono font-bold">
                    Khám phá thế giới truyện <br /> cùng chúng tôi ❤️
                </p>

                {/* Form đăng nhập */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="block text-gray-700 font-mono font-bold text-xl">
                            ✉️
                        </label>
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-mono font-bold text-xl">
                            🔒
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu của bạn"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 font-mono"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17.94 17.94A10.94 10.94 0 0112 19c-5.52 0-10-4.48-10-10 0-2.39.84-4.58 2.24-6.34M12 5c5.52 0 10 4.48 10 10 0 2.39-.84 4.58-2.24 6.34M12 12v0M12 12l-3.5 3.5M12 12l3.5 3.5" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Đăng nhập */}
                    <button
                        type="submit"
                        className="w-65 bg-gradient-to-br from-blue-100 via-red-300 to-purple-500 text-white py-2 font-mono rounded-3xl hover:bg-blue-600
              transition duration-300 justify-center flex items-center
              mx-auto mb-4 font-extrabold hover:scale-105 transform mt-7"
                    >
                        Đăng Nhập
                    </button>

                    {/* Quên mật khẩu */}
                    <div className="text-center mt-6">
                        <a
                            href="/ForgotPasswordModal"
                            className="text-blue-500 font-mono font-bold"
                        >
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Đăng nhập với Google */}
                    <div className="mt-6 rounded-4xl flex justify-center items-center">
                        <button
                            type="button"
                            className="w-100 h-auto flex items-center justify-center bg-white border
                border-gray-300 py-2 rounded-3xl hover:bg-gray-100 
                transition duration-300 font-mono"
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
                        <p className="text-gray-600 font-mono font-bold">
                            Bạn chưa có tài khoản?
                        </p>
                        <a
                            href="/RegisterPage"
                            className="text-blue-500 font-mono font-bold"
                        >
                            Tạo tài khoản
                        </a>
                    </div>

                </form>
                <div />
            </div>
        </div>
    );
};

export default LoginPage;
