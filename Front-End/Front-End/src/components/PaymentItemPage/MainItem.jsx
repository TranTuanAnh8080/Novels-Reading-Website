
import React, { useState } from "react";
import { Info, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
const MainItem = () => {

    const packages = [
        { id: 1, coins: "10.000 xu", price: "10.000đ", icon: "🌟" },
        { id: 2, coins: "25.000 xu", price: "25.000đ", icon: "💰" },
        { id: 3, coins: "60.000 xu", price: "55.000đ", icon: "🎉" },
        { id: 4, coins: "120.000 xu", price: "100.000đ", icon: "💎" },
        { id: 5, coins: "250.000 xu", price: "200.000đ", icon: "🔥" },
    ];

    const [selected, setSelected] = useState(null);

    const handleSelect = (pkg) => {
        setSelected(pkg.id);
        // Sau này gọi API thanh toán ở đây
    };

    return (

        <div>
            {/* Nội dung chính */}
            <main className="flex-grow py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Tiêu đề */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-sky-800 mb-2">
                            Nạp Xu Bằng Hình Thức Chuyển Khoản
                        </h1>
                        <p className="text-gray-600">
                            Bạn hãy chọn gói nạp xu phù hợp để mở ra nhiều tiện ích và trải nghiệm tốt hơn nhé 🌟
                        </p>
                    </div>

                    {/* Thông báo nhỏ */}
                    <div className="bg-gradient-to-r bg-violet-100 via-rose-50 to-yellow-100 border border-sky-200 text-sky-800
                     rounded-xl px-4 py-3 flex items-start gap-2 mb-10 shadow-sm">
                        <Info className="w-5 h-5 text-sky-800 mt-0.5" />
                        <p className="text-center w-full text-sky-800 font-normal">
                            Vui lòng chuyển khoản đúng nội dung để hệ thống tự động cộng xu. <br />
                            Giao dịch sẽ được xử lý trong <b>1-5 phút </b>
                            sau khi chuyển khoản thành công.
                        </p>
                    </div>

                    {/* Gói nạp xu */}
                    <div className="space-y-10 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Hàng đầu tiên: 2 card */}
                            {packages.slice(0, 2).map((pkg) => (
                                <motion.div
                                    key={pkg.id}
                                    className={`relative rounded-3xl p-8 text-center transition-all cursor-pointer
              ${selected === pkg.id
                                            ? "bg-gradient-to-r bg-violet-100 via-rose-100 to-yellow-100 shadow-xl"
                                            : "bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1"
                                        }`}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => handleSelect(pkg)}
                                >
                                    <div className="text-5xl mb-4">{pkg.icon}</div>
                                    <h3 className="text-2xl font-extrabold text-gray-800">{pkg.coins}</h3>
                                    <p className="text-gray-500 mt-1 text-lg">{pkg.price}</p>

                                    <button
                                        className={`mt-6 w-full py-3 rounded-full font-bold shadow-md transition-all 
                ${selected === pkg.id
                                                ? "bg-sky-600 text-white hover:bg-sky-700"
                                                : "bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:brightness-110"
                                            }`}
                                    >
                                        {selected === pkg.id ? "✅ Đã chọn" : "⚡ Nạp ngay"}
                                    </button>
                                </motion.div>
                            ))}

                            {/* Hàng thứ hai: 2 card */}
                            {packages.slice(2, 4).map((pkg) => (
                                <motion.div
                                    key={pkg.id}
                                    className={`relative rounded-3xl p-8 text-center transition-all cursor-pointer
              ${selected === pkg.id
                                            ? "bg-gradient-to-b bg-violet-100 via-rose-100 to-yellow-100 border-sky-400 shadow-xl"
                                            : "bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1"
                                        }`}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => handleSelect(pkg)}

                                >
                                    {/* Badge ưu đãi cho gói đặc biệt */}
                                    {pkg.id === 3 && (
                                        <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                                            🔥 Tiết kiệm 20%
                                        </span>
                                    )}

                                    <div className="text-5xl mb-4">{pkg.icon}</div>
                                    <h3 className="text-2xl font-extrabold text-gray-800">{pkg.coins}</h3>
                                    <p className="text-gray-500 mt-1 text-lg">{pkg.price}</p>

                                    <button
                                        className={`mt-6 w-full py-3 rounded-full font-bold shadow-md transition-all 
                ${selected === pkg.id
                                                ? "bg-sky-600 text-white hover:bg-sky-700"
                                                : "bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:brightness-110"
                                            }`}
                                    >
                                        {selected === pkg.id ? "✅ Đã chọn" : "⚡ Nạp ngay"}
                                    </button>
                                </motion.div>
                            ))}

                            {/* Hàng cuối: 1 card full width */}
                            <motion.div
                                key={packages[4].id}
                                className={`relative rounded-3xl p-8 text-center transition-all cursor-pointer md:col-span-2
            ${selected === packages[4].id
                                        ? "bg-gradient-to-b bg-violet-100 via-rose-100 to-yellow-100 border-sky-400 shadow-xl"
                                        : "bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1"
                                    }`}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => handleSelect(packages[4])}
                            >
                                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                                    💎 Best Choice
                                </span>

                                <div className="text-4xl mb-4">{packages[4].icon}</div>
                                <h3 className="text-3xl font-extrabold text-gray-800">{packages[4].coins}</h3>
                                <p className="text-gray-500 mt-1 text-lg">{packages[4].price}</p>

                                <button
                                    className={`mt-6 w-80 py-3 rounded-full font-bold shadow-md transition-all 
              ${selected === packages[4].id
                                            ? "bg-sky-600 text-white hover:bg-sky-700"
                                            : "bg-gradient-to-r from-indigo-400 to-purple-500 text-white hover:brightness-110"
                                        }`}
                                >
                                    {selected === packages[4].id ? "✅ Đã chọn" : "🚀 Nạp ngay"}
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Button xác nhận lựa chọn gói thanh toán */}
                    <div className="text-center mt-6 mb-6">
                        <button
                            disabled={!selected}
                            className={`px-4 py-3 rounded-full font-medium shadow-md transition-all 
        ${selected
                                    ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:brightness-110"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            onClick={() => {
                                if (selected) {
                                    alert(`Bạn đã chọn gói: ${packages.find(p => p.id === selected).coins}`);
                                    // 👉 Sau này có thể gọi API thanh toán tại đây
                                }
                            }}
                        >
                            {selected ? "Xác nhận gói đã chọn" : "Chọn gói để tiếp tục"}
                        </button>
                    </div>

                    {/* Hoặc chọn phương thức khác */}
                    <div className="text-center mb-3 mt-[-2%] font-medium">
                        <p className="text-gray-600 mb-2">Hoặc chọn phương thức khác</p>
                        {/* Nạp bằng chuyển thẻ cào */}
                        <div className="text-center">
                            <a
                                href="/ScratchCardPayment"
                                className="text-blue-600 font-medium"
                            >
                                🏦Nạp bằng chuyển thẻ cào💵
                            </a>
                        </div>
                    </div>

                    {/* Lưu ý */}
                    <div className="bg-amber-50 border border-amber-200 
          rounded-3xl px-4 py-5 flex items-start gap-3 shadow-sm mt-10">
                        <AlertTriangle className="w-6 h-6 text-amber-500 mt-0.5" />
                        <div className="text-sm text-amber-800 space-y-1">
                            <p>⚠️ <b>Lưu ý quan trọng</b></p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Mỗi chuyển sĩ chỉ dùng 1 lần, xu sẽ không được cộng tự động nếu sai nội dung.</li>
                                <li>Vui lòng chuyển khoản đúng số tiền theo gói đã chọn.</li>
                                <li>Thời gian xử lý: <b>1-5 phút</b> sau khi chuyển khoản thành công.</li>
                                <li>Liên hệ hỗ trợ nếu gặp sự cố.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default MainItem;