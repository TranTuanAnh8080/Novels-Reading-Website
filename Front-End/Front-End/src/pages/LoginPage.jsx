import React, { useState, useEffect } from "react";
import image from "../assets/inkrealm_logo.png";
import vietnamFlag from "../assets/vietnam_flag.png";
import Confetti from "react-confetti";
import FancyImages from "./FancyImages";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showConfetti, setShowConfetti] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // tắt confetti sau 5 giây
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Xử lý đăng nhập
    // Xử lý đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra đầu vào
        if (!username.trim() || !password.trim()) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

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
                    timeout: 5000, // Timeout sau 5 giây
                }
            );

            if (response.status === 200) {
                // ✅ Xử lý response thành công
                const { message, token, user } = response.data;

                console.log("✅ Đăng nhập thành công:", message);
                console.log("👤 Thông tin người dùng:", user);

                // 🔐 Lưu thông tin đăng nhập vào sessionStorage
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("accountId", user.accountId);

                // 🎯 Cài đặt header mặc định cho axios
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                // 🔔 Hiển thị thông báo thành công
                alert(`Chào mừng ${user.fullName}! 🎉`);

                // 🚀 Chuyển hướng đến trang ModeratorHomePage
                navigate("/ModeratorHomePage", {
                    replace: true, // Không cho phép quay lại trang đăng nhập
                    state: { user }, // Truyền thông tin người dùng sang trang tiếp theo
                });
            }
        } catch (error) {
            console.error("❌ Lỗi đăng nhập:", error);

            if (error.response) {
                // Xử lý lỗi từ server
                const status = error.response.status;
                const errorMsg = error.response.data?.message;

                switch (status) {
                    case 400:
                        alert("⚠️ Thông tin đăng nhập không hợp lệ!");
                        break;
                    case 401:
                        alert("❌ Sai tên đăng nhập hoặc mật khẩu!");
                        break;
                    case 403:
                        alert("🚫 Tài khoản bị khóa hoặc không có quyền truy cập!");
                        break;
                    case 500:
                        alert("💥 Lỗi server! Vui lòng thử lại sau.");
                        break;
                    default:
                        alert(errorMsg || "Đăng nhập thất bại!");
                }
            } else if (error.request) {
                // Xử lý lỗi kết nối mạng hoặc timeout
                console.log("❌ Lỗi request:", error.request);

                alert("❌ Không thể kết nối đến server!\n" +
                    "Vui lòng kiểm tra:\n" +
                    "- Kết nối mạng\n" +
                    "- Backend có đang chạy không ?\n");

                console.log("🌐 Network Error:", error.message);
            } else {
                // Xử lý lỗi khác
                alert("⚠️ Có lỗi xảy ra: " + error.message);
            }
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-white via-sky-100 to-red-100 
        flex-row">
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
                    className="mb-3 w-42 h-17 contrast-125 brightness-90 saturate-200"
                />
                <p className="text-gray-600 mb-3 text-2xl font-medium">
                    Khám phá thế giới truyện <br /> cùng chúng tôi ❤️
                </p>

                {/* Form đăng nhập */}
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-3">
                        <label className="block text-gray-700 font-bold text-xl">✉️</label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập của bạn"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="block text-gray-700 font-bold text-xl">🔒</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* Nút đăng nhập */}
                    <button
                        type="submit"
                        className="w-65 bg-gradient-to-br from-blue-100 via-red-300 to-purple-500 text-white py-2 rounded-3xl hover:bg-blue-600
            transition duration-300 justify-center flex items-center mx-auto mb-4 font-bold hover:scale-105 transform mt-7"
                    >
                        Đăng Nhập
                    </button>
                </form>

                {/* Nút Test DB */}
                <button
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
                </button>


                {/* Quên mật khẩu */}
                <div className="text-center mt-6">
                    <a
                        href="/ForgotPasswordModal"
                        className="text-blue-500 font-medium"
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
                        className="text-blue-500 font-medium"
                    >
                        Tạo tài khoản
                    </a>
                </div>


                <div />
            </div>
        </div>
    );
};

export default LoginPage;
