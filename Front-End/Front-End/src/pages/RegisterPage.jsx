import React, { useState, useEffect } from "react";
import FancyImages2 from "./FancyImages2";
import image from "../assets/inkrealm_logo.png";
import vietnamFlag from "../assets/vietnam_flag.png";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
const RegisterPage = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

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
                    className="mb-5 w-38 h-15 contrast-125 brightness-90 saturate-200 ml-31"
                />
                <form>
                    {/* Họ và Tên */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Họ và Tên <strong className="text-red-500">*</strong></label>
                        <input
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-mono mt-2"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email <strong className="text-red-500">*</strong></label>
                        <input
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Số Điện Thoại */}
                    {/* <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Số Điện Thoại <strong className="text-red-500">*</strong></label>
                        <input
                            type="tel"
                            placeholder="Nhập số điện thoại của bạn"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div> */}

                    {/* Mật khẩu */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Mật khẩu <strong className="text-red-500">*</strong></label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                    {/* Ngày sinh */}

                    {/* <div className="mb-7">
                        <label className="block text-gray-700 font-medium mb-2">Ngày sinh <strong className="text-red-500">*</strong></label>
                        <div className="flex space-x-2">
                            <select className="w-1/3 px-4 py-2 border rounded-md focus:outline-none
                             focus:ring-2 focus:ring-blue-500">
                                <option>Ngày</option>
                           
                                {[...Array(31)].map((_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Tháng</option>
                             
                                {[...Array(12)].map((_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Năm</option>
                                // độ tuổi bắt đầu là 30 tuổi, tức là năm 2025 - 30 = 1995
                                {[...Array(36)].map((_, i) => (
                                    <option key={i} value={2025 - i}>
                                        {2025 - i}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div> */}
                    {/* Nút đăng ký */}
                    <Link to="/LoginPage">
                        <button
                            type="submit"
                            className="w-65 bg-gradient-to-br from-blue-100 via-red-300 to-purple-500
                         text-white py-2 rounded-3xl hover:bg-blue-600
                         transition duration-300 justify-center
                          flex items-center mx-auto mb-4 font-bold hover:scale-105 transform"
                        >
                            Đăng Ký
                        </button>

                    </Link>
                    {/* Đã có tài khoản */}
                    <div className="text-center mt-2">
                        <p className="text-gray-600 font-medium">Bạn đã có tài khoản?</p>
                        <a href="/LoginPage" className="text-blue-500 font-medium">
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