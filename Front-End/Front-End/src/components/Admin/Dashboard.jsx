import React, { useState } from "react";
import {
    TrendingUp, Users, BookOpen, DollarSign, LayoutDashboard, Icon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Legend, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";
import { useEffect } from "react";

// --- DỮ LIỆU GIẢ LẬP ---
const kpiData = [
    {
        title: "Tổng Doanh Thu",
        value: "18,800,000 VND",
        icon: DollarSign,
        color: "text-emerald-500",
        bgColor: "from-emerald-50 to-emerald-100/50 dark:from-emerald-900/10 dark:to-emerald-800/10",
    },
    {
        title: "Tổng Người Dùng",
        value: "30",
        icon: Users,
        color: "text-blue-500",
        bgColor: "from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10",
    },
    {
        title: "Truyện Đã Đăng",
        value: "10",
        icon: BookOpen,
        color: "text-amber-500",
        bgColor: "from-amber-50 to-amber-100/50 dark:from-amber-900/10 dark:to-amber-800/10",
    },
    {
        title: "Tăng trưởng Tuần",
        value: "+12.5%",
        icon: TrendingUp,
        color: "text-rose-500",
        bgColor: "from-rose-50 to-rose-100/50 dark:from-rose-900/10 dark:to-rose-800/10",
        description: "So với tuần trước",
    },
];

const revenueData = {
    week: [
        { name: "Tuần 1", DoanhThu: 1200000 },
        { name: "Tuần 2", DoanhThu: 1500000 },
        { name: "Tuần 3", DoanhThu: 1000000 },
        { name: "Tuần 4", DoanhThu: 1880000 },
        { name: "Tuần 5", DoanhThu: 1300000 },
        { name: "Tuần 6", DoanhThu: 1600000 },
        { name: "Tuần 7", DoanhThu: 1100000 },
        { name: "Tuần 8", DoanhThu: 1700000 },
        { name: "Tuần 9", DoanhThu: 1400000 },
        { name: "Tuần 10", DoanhThu: 1550000 },
    ],
    month: [

        { name: "Tháng 10", DoanhThu: 3500000 },
        { name: "Tháng 11", DoanhThu: 6700000 },
        { name: "Tháng 12", DoanhThu: 4200000 },
    ],
    // quarter: [
    //     { name: "Q1", DoanhThu: 138000000 },
    //     { name: "Q2", DoanhThu: 164000000 },
    //     { name: "Q3", DoanhThu: 128000000 },
    //     { name: "Q4", DoanhThu: 192000000 },
    // ],
    year: [
        { name: "2025", DoanhThu: 18800000 },
    ],
};


const genreData = [
    { name: "Tiên Hiệp", value: 40 },
    { name: "Ngôn Tình", value: 30 },
    { name: "Kiếm Hiệp", value: 20 },
    { name: "Huyễn Huyền", value: 26 },
];

const topTrendingData = [
    { day: "Thứ 2", "Đế Bá": 10, "Thần Đạo Đan Tôn": 25, "Nhất Niệm Vĩnh Hằng": 100, "Linh Vũ Thiên Hạ": 112, "Hạ Tân": 112 },
    { day: "Thứ 3", "Đế Bá": 20, "Thần Đạo Đan Tôn": 40, "Nhất Niệm Vĩnh Hằng": 120, "Linh Vũ Thiên Hạ": 43, "Hạ Tân": 23 },
    { day: "Thứ 4", "Đế Bá": 30, "Thần Đạo Đan Tôn": 65, "Nhất Niệm Vĩnh Hằng": 57, "Linh Vũ Thiên Hạ": 123, "Hạ Tân": 76 },
    { day: "Thứ 5", "Đế Bá": 40, "Thần Đạo Đan Tôn": 80, "Nhất Niệm Vĩnh Hằng": 87, "Linh Vũ Thiên Hạ": 32, "Hạ Tân": 11 },
    { day: "Thứ 6", "Đế Bá": 30, "Thần Đạo Đan Tôn": 11, "Nhất Niệm Vĩnh Hằng": 23, "Linh Vũ Thiên Hạ": 32, "Hạ Tân": 7 },
    { day: "Thứ 7", "Đế Bá": 70, "Thần Đạo Đan Tôn": 32, "Nhất Niệm Vĩnh Hằng": 54, "Linh Vũ Thiên Hạ": 33, "Hạ Tân": 87 },
    { day: "Chủ nhật", "Đế Bá": 100, "Thần Đạo Đan Tôn": 56, "Nhất Niệm Vĩnh Hằng": 89, "Linh Vũ Thiên Hạ": 34, "Hạ Tân": 92 },
];



// --- CARD CHỈ SỐ ---
const KpiCard = ({ title, value, icon: Icon, color, bgColor, description }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        className={`p-5 rounded-2xl shadow-md bg-gradient-to-br ${bgColor} border border-gray-200/60 dark:border-gray-700 transition-all`}
    >
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {title}
            </h3>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
        </p>
        {description && (
            <p className={`mt-2 text-xs font-semibold ${color}`}>{description}</p>
        )}
    </motion.div>
);

// --- BIỂU ĐỒ DOANH THU ---
const RevenueChart = () => {
    const [range, setRange] = useState("day");
    const [selectedDate, setSelectedDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [chartData, setChartData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(false);

    // --- Gọi API doanh thu ---
    const fetchRevenueData = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            let endpoint = "";

            // ✅ Xác định endpoint giống như RevenueStatistics
            if (range === "day") {
                endpoint = selectedDate ? `date/${selectedDate}` : "today";
            } else if (range === "month") {
                endpoint = "month";
            } else if (range === "year") {
                endpoint = "year";
            } else if (range === "range" && fromDate && toDate) {
                endpoint = `range/${fromDate}/${toDate}`;
            } else {
                return;
            }

            const res = await fetch(
                `https://be-ink-realm-c7jk.vercel.app/admin/dashboard/revenue/${endpoint}`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Lỗi tải dữ liệu doanh thu");

            // ✅ Chuẩn hóa dữ liệu cho biểu đồ
            if (range === "day") {
                setChartData([{ name: data.date, DoanhThu: Number(data.revenue) }]);
                setTotalRevenue(Number(data.revenue));
            } else if (range === "month") {
                const list = data.data?.map((item) => ({
                    name: item.name || item.date || "Ngày",
                    DoanhThu: Number(item.revenue || 0),
                })) || [{ name: "Tháng này", DoanhThu: Number(data.revenue) }];
                setChartData(list);
                setTotalRevenue(Number(data.revenue));
            } else if (range === "year") {
                setChartData([{ name: data.year || "Năm nay", DoanhThu: Number(data.revenue) }]);
                setTotalRevenue(Number(data.revenue));
            } else if (range === "range") {
                const list =
                    data.dailyRevenue?.map((d) => ({
                        name: d.date,
                        DoanhThu: Number(d.revenue),
                    })) || [];
                setChartData(list);
                setTotalRevenue(Number(data.totalRevenue || 0));
            }
        } catch (err) {
            console.error("❌ Lỗi tải dữ liệu doanh thu:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenueData();
    }, [range, selectedDate, fromDate, toDate]);

    // --- Giao diện giống như trước ---
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Biểu đồ doanh thu
                </h2>

                {/* Bộ chọn phạm vi */}
                <div className="flex gap-2 flex-wrap items-center">
                    {["day", "month", "year", "range"].map((r) => (
                        <button
                            key={r}
                            onClick={() => {
                                setRange(r);
                                setSelectedDate("");
                                setFromDate("");
                                setToDate("");
                            }}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${range === r
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                                }`}
                        >
                            {r === "day"
                                ? "Ngày"
                                : r === "month"
                                    ? "Tháng"
                                    : r === "year"
                                        ? "Năm"
                                        : "Khoảng"}
                        </button>
                    ))}

                    {/* Ngày cụ thể */}
                    {range === "day" && (
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="p-1.5 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-white"
                        />
                    )}

                    {/* Khoảng thời gian */}
                    {range === "range" && (
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="p-1.5 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-white"
                            />
                            <span className="text-gray-500 dark:text-gray-300">→</span>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="p-1.5 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Biểu đồ cột */}
            <div className="w-full h-[320px] min-h-[300px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full text-gray-500">
                        Đang tải dữ liệu...
                    </div>
                ) : chartData.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-400">
                        Không có dữ liệu doanh thu.
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#888888" />
                            <YAxis
                                tickFormatter={(v) =>
                                    new Intl.NumberFormat("vi-VN", { notation: "compact" }).format(v)
                                }
                                stroke="#888888"
                            />
                            <Tooltip
                            cursor={false}
                                formatter={(v) => `${new Intl.NumberFormat("vi-VN").format(v)} ₫`}
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                }}
                            />
                            <Bar
                                dataKey="DoanhThu"
                                fill="#4f46e5"
                                radius={[8, 8, 0, 0]}
                                barSize={60}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Tổng doanh thu */}
            <div className="text-center mt-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tổng doanh thu{" "}
                    {range === "day"
                        ? selectedDate
                            ? `ngày ${selectedDate}`
                            : "hôm nay"
                        : range === "month"
                            ? "tháng này"
                            : range === "year"
                                ? "năm nay"
                                : fromDate && toDate
                                    ? `từ ${fromDate} → ${toDate}`
                                    : ""}
                </p>
                <h3 className="text-2xl font-bold text-blue-600 mt-1">
                    {new Intl.NumberFormat("vi-VN").format(totalRevenue)} ₫
                </h3>
            </div>
        </div>
    );
};

// --- BIỂU ĐỒ TRÒN ---
const GenrePieChart = () => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-700 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-6 dark:text-white">
            Phân loại Thể loại Yêu thích
        </h2>
        <div className="relative w-48 h-48">
            <div
                className="absolute w-full h-full rounded-full"
                style={{
                    backgroundImage: `conic-gradient(
            #4f46e5 0% ${genreData[0].value * 3.6}deg,
            #ec4899 ${genreData[0].value * 3.6}deg ${(genreData[0].value + genreData[1].value) * 3.6
                        }deg,
            #f97316 ${(genreData[0].value + genreData[1].value) * 3.6}deg ${(genreData[0].value + genreData[1].value + genreData[2].value) * 3.6
                        }deg,
            #10b981 ${(genreData[0].value +
                            genreData[1].value +
                            genreData[2].value) *
                        3.6
                        }deg 360deg
          )`,
                }}
            ></div>
            <div className="absolute inset-0 m-auto w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center font-semibold text-gray-700 dark:text-gray-200">
                75%
            </div>
        </div>
        <div className="mt-6 w-full max-w-xs space-y-2">
            {genreData.map((item, i) => (
                <div key={i} className="flex justify-between text-sm dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor:
                                    i === 0
                                        ? "#4f46e5"
                                        : i === 1
                                            ? "#ec4899"
                                            : i === 2
                                                ? "#f97316"
                                                : "#10b981",
                            }}
                        ></span>
                        {item.name}
                    </div>
                    <span className="font-semibold">{item.value}%</span>
                </div>
            ))}
        </div>
    </div>
);

const TopTrendingLineChart = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
            🔥 Xu Hướng Đọc Truyện Trong Tuần
        </h2>

        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={topTrendingData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                    cursor={false}
                    contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff",
                    }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line type="monotone" dataKey="Đế Bá" stroke="#34d399" strokeWidth={3} dot />
                <Line type="monotone" dataKey="Thần Đạo Đan Tôn" stroke="#60a5fa" strokeWidth={3} dot />
                <Line type="monotone" dataKey="Nhất Niệm Vĩnh Hằng" stroke="#a78bfa" strokeWidth={3} dot />
                <Line type="monotone" dataKey="Linh Vũ Thiên Hạ" stroke="#f472b6" strokeWidth={3} dot />
                <Line type="monotone" dataKey="Hạ Tân" stroke="#60a5fa" strokeWidth={3} dot />
            </LineChart>
        </ResponsiveContainer>
    </div>
);
// --- DASHBOARD CHÍNH ---
const Dashboard = () => (
    <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* HEADER */}
        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3 mb-4">
                <LayoutDashboard className="w-7 h-7 text-blue-600" />
                Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-10">
                Theo dõi các chỉ số hoạt động, tài chính và xu hướng nội dung gần đây.
            </p>
        </motion.div>

        {/* KPI CARDS */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {kpiData.map((data, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                    <KpiCard {...data} />
                </motion.div>
            ))}
        </div> */}

        {/* BIỂU ĐỒ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            <motion.div
                className="lg:col-span-8 h-[420px]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <RevenueChart />
            </motion.div>
            <motion.div
                className="lg:col-span-4 h-[420px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <GenrePieChart />
            </motion.div>
        </div>

        {/* BẢNG XU HƯỚNG */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10"
        >
            <TopTrendingLineChart />
        </motion.div>
    </div>
);

export default Dashboard;
