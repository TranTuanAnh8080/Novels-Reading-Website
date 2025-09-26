import { useState } from "react";
import { motion } from "framer-motion";
import { Info, AlertTriangle } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const packages = [
    { id: 1, coins: "10.000 xu", price: "10.000đ" },
    { id: 2, coins: "25.000 xu", price: "25.000đ" },
    { id: 3, coins: "60.000 xu", price: "60.000đ" },
    { id: 4, coins: "120.000 xu", price: "120.000đ" },
    { id: 5, coins: "250.000 xu", price: "250.000đ" },
];

export default function PaymentItem() {
    const [selected, setSelected] = useState(null);

    const handleSelect = (pkg) => {
        setSelected(pkg.id);
        // Sau này gọi API thanh toán ở đây
    };

    return (
        <div className="min-h-screen flex flex-col
         bg-gradient-to-r from-sky-100 via-transparent to-rose-100">
            <Header />
            {/* Nội dung chính */}
            <main className="flex-grow py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Tiêu đề */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-sky-800 mb-2">
                            Nạp Xu Bằng Hình Thức Chuyển Khoản
                        </h1>
                        <p className="text-gray-600">
                            Chọn gói nạp xu phù hợp để mở ra nhiều tiện ích và trải nghiệm tốt hơn 🌟
                        </p>
                    </div>

                    {/* Thông báo nhỏ */}
                    <div className="bg-sky-50 border border-sky-200 text-sky-800 rounded-xl px-4 py-3 flex items-start gap-2 mb-10 shadow-sm">
                        <Info className="w-5 h-5 text-sky-800 mt-0.5" />
                        <p className="text-center w-full text-sky-800 font-normal">
                            Vui lòng chuyển khoản đúng nội dung để hệ thống tự động cộng xu. <br />
                            Giao dịch sẽ được xử lý trong <b>1-5 phút </b>
                            sau khi chuyển khoản thành công.
                        </p>
                    </div>


                    {/* Gói nạp xu */}
                    <div className="space-y-10 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {packages.slice(0, 2).map((pkg) => (
                                <motion.div
                                    key={pkg.id}
                                    className={`rounded-4xl border transition-all
                                         p-6 text-center shadow-md hover:shadow-xl 
          ${selected === pkg.id ? "border-sky-500 bg-sky-50" : "border-gray-200 bg-white"}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleSelect(pkg)}
                                >
                                    <h3 className="text-xl font-bold text-sky-800">{pkg.coins}</h3>
                                    <p className="text-gray-600 mt-2">{pkg.price}</p>
                                    <button
                                        className={`mt-6 w-70 py-2 rounded-md font-semibold text-white shadow-md transition-all ${selected === pkg.id
                                            ? "bg-sky-600 hover:bg-sky-700"
                                            : "bg-gradient-to-r from-sky-400 to-indigo-400 hover:brightness-110"
                                            }`}
                                    >
                                        {selected === pkg.id ? "Đã chọn ✅" : "Chọn gói"}
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {packages.slice(2, 4).map((pkg) => (
                                <motion.div
                                    key={pkg.id}
                                    className={`rounded-4xl border cursor-pointer transition-all p-6 text-center shadow-md hover:shadow-xl 
          ${selected === pkg.id ? "border-sky-500 bg-sky-50" : "border-gray-200 bg-white"}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleSelect(pkg)}
                                >
                                    <h3 className="text-xl font-bold text-sky-800">{pkg.coins}</h3>
                                    <p className="text-gray-600 mt-2">{pkg.price}</p>
                                    <button
                                        className={`mt-6 w-80 py-2 rounded-lg font-semibold text-white shadow-md transition-all ${selected === pkg.id
                                            ? "bg-sky-600 hover:bg-sky-700"
                                            : "bg-gradient-to-r from-sky-400 to-indigo-400 hover:brightness-110"
                                            }`}
                                    >
                                        {selected === pkg.id ? "Đã chọn ✅" : "Chọn gói"}
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="md:col-span-2 flex justify-center">
                                {packages.slice(4, 5).map((pkg) => (
                                    <motion.div
                                        key={pkg.id}
                                        className={`w-full md:w-1/2 rounded-4xl border cursor-pointer transition-all p-6 text-center shadow-md hover:shadow-xl 
            ${selected === pkg.id ? "border-sky-500 bg-sky-50" : "border-gray-200 bg-white"}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleSelect(pkg)}
                                    >
                                        <h3 className="text-xl font-bold text-sky-800">{pkg.coins}</h3>
                                        <p className="text-gray-600 mt-2">{pkg.price}</p>
                                        <button
                                            className={`mt-6 w-70 py-2 rounded-lg font-semibold text-white shadow-md transition-all ${selected === pkg.id
                                                ? "bg-sky-600 hover:bg-sky-700"
                                                : "bg-gradient-to-r from-sky-400 to-indigo-400 hover:brightness-110"
                                                }`}
                                        >
                                            {selected === pkg.id ? "Đã chọn ✅" : "Chọn gói"}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hoặc chọn phương thức khác */}
                    <div className="text-center mb-3 mt-[-2%]">
                        <p className="text-gray-600 mb-2">Hoặc chọn phương thức khác</p>
                        {/* Nạp bằng chuyển thẻ cào */}
                        <div className="text-center">
                            <a
                                href="/ScratchCardPayment"
                                className="text-blue-600 font-mono font-bold"
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
            <Footer />
        </div>
    );
}
