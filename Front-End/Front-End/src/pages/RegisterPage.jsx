import React, { useState, useEffect } from "react";
import FancyImages2 from "./FancyImages2";
import image from "../assets/inkrealm_logo.png";
import vietnamFlag from "../assets/vietnam_flag.png";
import Confetti from "react-confetti";
const RegisterPage = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

     // tắt confetti sau 8 giây
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className="flex h-full bg-gradient-to-br from-rose-50 via-sky-100 to-red-100 flex-row">

            {/* Hiệu ứng pháo giấy */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={300}
                    recycle={false} // chỉ rơi 1 lần
                />
            )}

            {/* Form đăng ký */}
            <div className="w-1/2 h-full flex flex-col justify-center px-16 mt-5">
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
                    className="mb-3 w-42 h-17 contrast-125 brightness-90 saturate-200 ml-27"
                />
                <form>
                    {/* Tên hiển thị */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Tên hiển thị *</label>
                        <input
                            type="text"
                            placeholder="Nhập tên hiển thị của bạn"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Email *</label>
                        <input
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Mật khẩu */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Mật khẩu *</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                    {/* Xác nhận mật khẩu */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Xác nhận mật khẩu *</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? (
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

                    {/* Ngày sinh */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Ngày sinh *</label>
                        <div className="flex space-x-2">
                            <select className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Ngày</option>
                                {/* Thêm các ngày */}
                            </select>
                            <select className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Tháng</option>
                                {/* Thêm các tháng */}
                            </select>
                            <select className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Năm</option>
                                {/* Thêm các năm */}
                            </select>
                        </div>
                    </div>
                    {/* Nút đăng ký */}
                    <button
                        type="submit"
                        className="w-65 bg-gradient-to-br from-blue-100 via-red-300 to-purple-500 text-white py-2 font-mono rounded-3xl hover:bg-blue-600
                         transition duration-300 justify-center flex items-center mx-auto mb-4 font-extrabold hover:scale-105 transform"
                    >
                        Đăng ký
                    </button>

                    {/* Đã có tài khoản */}
                    <div className="text-center mt-2 font-mono">
                        <p className="text-gray-600">Bạn đã có tài khoản?</p>
                        <a href="/LoginPage" className="text-blue-500 hover:underline font-medium">
                            Đăng nhập
                        </a>
                    </div>
                </form>
            </div>
            <FancyImages2 />
        </div>
    );
};

export default RegisterPage;