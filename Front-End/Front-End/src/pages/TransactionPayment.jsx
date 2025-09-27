import React, { useState } from "react";
import { Calendar, Search } from "lucide-react";

const TransactionPayment = () => {
    const [activeTab, setActiveTab] = useState("all");

    const transactions = [
        {
            time: "15/07/2025 08:45",
            type: "Tiêu xu",
            detail: "Mua truyện - Chuyển sinh thành Slime",
            amount: -150000,
            status: "Thành công",
        },
        {
            time: "14/07/2025 10:05",
            type: "Doanh thu",
            detail: "Doanh thu dịch truyện 1-7-2025",
            amount: 270300,
            status: "Thành công",
        },
        {
            time: "13/07/2025 15:12",
            type: "Tiêu xu",
            detail: "Mua chương 75 - Quỷ Bí Chi Chủ",
            amount: -500,
            status: "Thành công",
        },
        {
            time: "13/07/2025 14:21",
            type: "Nạp xu",
            detail: "Chuyển khoản 100.000đ",
            amount: 120000,
            status: "Thành công",
        },
    ];

    const totalDeposit = 545000;
    const totalRevenue = 1545000;
    const totalSpent = 325000;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
            {/* Header */}
            <h2 className="text-lg font-semibold text-sky-600 flex items-center gap-2 mb-1">
                📘 Lịch sử giao dịch
            </h2>
            <p className="text-sm text-gray-600 mb-6">
                Theo dõi tất cả các giao dịch nạp xu và tiêu xu của bạn
            </p>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-6">
                {["Tất cả", "Nạp xu", "Tiêu xu"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`pb-2 text-sm font-medium ${activeTab === tab.toLowerCase()
                            ? "text-sky-600 border-b-2 border-sky-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 border rounded-md px-3 py-2 flex-1 min-w-[200px]">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo từ khoá..."
                        className="w-full text-sm outline-none"
                    />
                </div>
                <div className="flex items-center border rounded-md px-3 py-2 text-gray-600 text-sm">
                    <input type="date" className="outline-none" />
                    <Calendar size={16} className="ml-2 text-gray-400" />
                </div>
                <div className="flex items-center border rounded-md px-3 py-2 text-gray-600 text-sm">
                    <input type="date" className="outline-none" />
                    <Calendar size={16} className="ml-2 text-gray-400" />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full  border-gray-50 rounded-lg">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Thời gian</th>
                            <th className="px-4 py-2 text-left">Loại giao dịch</th>
                            <th className="px-4 py-2 text-left">Mô tả chi tiết</th>
                            <th className="px-4 py-2 text-right">Số xu</th>
                            <th className="px-4 py-2 text-center">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t, idx) => (
                            <tr key={idx} className=" hover:bg-gray-50">
                                <td className="px-4 py-2">{t.time}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${t.type === "Tiêu xu"
                                            ? "bg-red-100 text-red-600"
                                            : t.type === "Nạp xu"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-indigo-100 text-indigo-600"
                                            }`}
                                    >
                                        {t.type}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{t.detail}</td>
                                <td
                                    className={`px-4 py-2 text-right font-medium ${t.amount < 0 ? "text-red-500" : "text-green-600"
                                        }`}
                                >
                                    {t.amount.toLocaleString("vi-VN")} xu
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <span className="text-green-600 font-medium">
                                        ✅ {t.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-4 rounded-lg bg-green-50 text-green-700 text-center font-medium">
                    Nạp: {totalDeposit.toLocaleString("vi-VN")} xu
                </div>
                <div className="p-4 rounded-lg bg-indigo-50 text-indigo-700 text-center font-medium">
                    TN: {totalRevenue.toLocaleString("vi-VN")} xu
                </div>
                <div className="p-4 rounded-lg bg-red-50 text-red-600 text-center font-medium">
                    Đã tiêu: {totalSpent.toLocaleString("vi-VN")} xu
                </div>
            </div>
        </div>
    );
};

export default TransactionPayment;
