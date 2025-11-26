import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area, // 👈 Thêm Area để tạo Gradient Area
} from "recharts";
import { DollarSign, CalendarDays } from "lucide-react"; // 👈 Thêm icons hiện đại

const RevenueStatistics = () => {
  const [range, setRange] = useState("day");
  const [selectedDate, setSelectedDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🔹 Hàm gọi API doanh thu (Giữ nguyên logic API)
  const fetchRevenue = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      let endpoint = "";

      // ✅ Logic chọn endpoint theo phạm vi (GIỮ NGUYÊN)
      if (range === "day") {
        endpoint = selectedDate
          ? `date/${selectedDate}`
          : "today";
      } else if (range === "month") {
        endpoint = "month";
      } else if (range === "year") {
        endpoint = "year";
      } else if (range === "range" && fromDate && toDate) {
        endpoint = `range/${fromDate}/${toDate}`;
      } else {
        return;
      }

      const response = await fetch(
        `https://be-ink-realm-c7jk.vercel.app/admin/dashboard/revenue/${endpoint}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Lỗi tải doanh thu!");

      // ✅ Chuẩn hóa dữ liệu hiển thị biểu đồ (GIỮ NGUYÊN)
      if (range === "day") {
        setChartData([{ name: data.date, revenue: Number(data.revenue) }]);
        setTotalRevenue(Number(data.revenue));
      } else if (range === "month") {
        setChartData(
          data.data || [{ name: "Tháng này", revenue: Number(data.revenue) }]
        );
        setTotalRevenue(Number(data.revenue));
      } else if (range === "year") {
        setChartData([{ name: data.year, revenue: Number(data.revenue) }]);
        setTotalRevenue(Number(data.revenue));
      } else if (range === "range") {
        const formatted = data.dailyRevenue?.map((d) => ({
          name: d.date,
          revenue: Number(d.revenue),
        })) || [];
        setChartData(formatted);
        setTotalRevenue(Number(data.totalRevenue || 0));
      }
    } catch (error) {
      console.error("❌ Lỗi khi lấy dữ liệu doanh thu:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Tự động fetch khi thay đổi phạm vi hoặc ngày
  useEffect(() => {
    fetchRevenue();
  }, [range, selectedDate, fromDate, toDate]);

  // Format tiền tệ cho Tooltip và YAxis
  const formatCurrency = (value) => new Intl.NumberFormat("vi-VN").format(value) + " ₫";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-blue-700/50 p-7 transition-all duration-500 hover:shadow-blue-500/20">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-blue-600 flex items-center gap-3">
          <CalendarDays className="w-7 h-7 text-blue-500" /> THỐNG KÊ DOANH THU
        </h2>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Chọn phạm vi */}
          {["day", "month", "year", "range"].map((r) => (
            <button
              key={r}
              onClick={() => {
                setRange(r);
                setSelectedDate("");
                setFromDate("");
                setToDate("");
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md 
                                ${range === r
                  ? "bg-blue-600 text-white shadow-blue-500/40"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                }`}
            >
              {r === "day" ? "Ngày" : r === "month" ? "Tháng" : r === "year" ? "Năm" : "Khoảng thời gian"}
            </button>
          ))}

          {/* 👇 Input chọn ngày chỉ hiện khi range = day */}
          {range === "day" && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="ml-2 p-2 border border-blue-300 dark:border-blue-600 rounded-lg text-sm 
                                          bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 
                                          focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-inner"
            />
          )}

          {/* 👇 Input chọn khoảng thời gian chỉ hiện khi range = range */}
          {range === "range" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border border-blue-300 dark:border-blue-600 rounded-lg text-sm 
                                            bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 
                                            focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-inner"
              />
              <span className="text-gray-600 dark:text-gray-300 font-bold text-lg">→</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-2 border border-blue-300 dark:border-blue-600 rounded-lg text-sm 
                                            bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 
                                            focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-inner"
              />
            </div>
          )}
        </div>
      </div>

      {/* --- BIỂU ĐỒ --- */}
      <div className="w-full h-[350px] min-h-[350px]">
        {loading ? (
          <div className="flex justify-center items-center h-full text-blue-400 font-semibold text-lg animate-pulse">
            <DollarSign className="w-6 h-6 mr-2 animate-spin-slow" /> Đang tải dữ liệu doanh thu...
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400 text-lg">
            Không có dữ liệu doanh thu trong phạm vi đã chọn.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenueArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Lưới tọa độ mờ ảo hơn */}
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" strokeOpacity={0.1} />

              {/* Trục X và Y */}
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13, fill: "#9CA3AF", angle: 0, dy: 8 }} // Tăng font, căn chỉnh tick
                interval={0} // Hiển thị đầy đủ các nhãn
              />
              <YAxis
                stroke="#9CA3AF"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13, fill: "#9CA3AF", dx: -4 }} // Tăng font, căn chỉnh tick
                width={90} // Tăng không gian cho trục Y
                tickFormatter={(value) => new Intl.NumberFormat("vi-VN").format(value)} // Hiển thị số tiền đầy đủ
              />
              {/* Tooltip Glassmorphism */}
              <Tooltip
                cursor={{ stroke: '#6366f1', strokeWidth: 2 }} // Thay đổi cursor thành màu Line
                contentStyle={{
                  backgroundColor: "rgba(30, 41, 59, 0.95)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "15px",
                  border: "1px solid #4f46e5",
                  color: "#fff",
                  padding: "10px 15px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                }}
                itemStyle={{ color: "#fff", fontWeight: 700 }}
                formatter={formatCurrency}
                labelFormatter={(label) => `Thời gian: ${label}`}
              />

              {/* Line Nổi bật */}
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5" // blue 600
                strokeWidth={4} // Tăng độ dày Line
                dot={{ r: 5, fill: "#fff", stroke: "#4f46e5", strokeWidth: 2 }} // Dot trắng viền xanh
                activeDot={{ r: 8, fill: "#c7d2fe", stroke: "#4f46e5", strokeWidth: 4 }} // ActiveDot lớn hơn
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* --- TỔNG DOANH THU (Làm nổi bật) --- */}
      <div className="text-center mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800/50">
        <p className="text-gray-600 dark:text-gray-300 text-base font-semibold uppercase tracking-wider">
          TỔNG DOANH THU
          {/* Hiển thị chi tiết kỳ đã chọn */}
          <span className="ml-2 font-normal text-sm italic opacity-80">
            ({range === "day"
              ? selectedDate
                ? `Ngày ${selectedDate}`
                : "Hôm nay"
              : range === "month"
                ? "Tháng này"
                : range === "year"
                  ? "Năm nay"
                  : fromDate && toDate
                    ? `Từ ${fromDate} → ${toDate}`
                    : "Chưa chọn khoảng thời gian"}
            )
          </span>
        </p>
        <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 mt-2 tracking-wide drop-shadow-md">
          {formatCurrency(totalRevenue)}
        </h3>
      </div>
    </div>
  );
};

export default RevenueStatistics;