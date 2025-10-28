import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueStatistics = () => {
  const [range, setRange] = useState("day");
  const [selectedDate, setSelectedDate] = useState(""); // 👈 Ngày cụ thể
  const [fromDate, setFromDate] = useState(""); // 👈 Khoảng từ
  const [toDate, setToDate] = useState("");   // 👈 Khoảng đến
  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🔹 Hàm gọi API doanh thu
  const fetchRevenue = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      let endpoint = "";

      // ✅ Logic chọn endpoint theo phạm vi
      if (range === "day") {
        endpoint = selectedDate
          ? `date/${selectedDate}` // Ngày cụ thể
          : "today";               // Hôm nay
      } else if (range === "month") {
        endpoint = "month";
      } else if (range === "year") {
        endpoint = "year";
      } else if (range === "range" && fromDate && toDate) {
        endpoint = `range/${fromDate}/${toDate}`;
      } else {
        return; // nếu range=range mà chưa chọn ngày thì không fetch
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

      // ✅ Chuẩn hóa dữ liệu hiển thị biểu đồ
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

  return (
    <div className="bg-white mt-17 dark:bg-gray-800 rounded-xl shadow-md border border-gray-200/60 dark:border-gray-700 p-6">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-2xl font-bold dark:text-white">
          📅 Thống kê doanh thu
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
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${range === r
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
                    : "Khoảng thời gian"}
            </button>
          ))}

          {/* 👇 Input chọn ngày chỉ hiện khi range = day */}
          {range === "day" && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="ml-2 p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm 
                         bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          )}

          {/* 👇 Input chọn khoảng thời gian chỉ hiện khi range = range */}
          {range === "range" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm 
                           bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
              <span className="text-gray-600 dark:text-gray-300">→</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm 
                           bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
          )}
        </div>
      </div>

      {/* --- BIỂU ĐỒ --- */}
      <div className="w-full h-[300px] min-h-[300px]">
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
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="0" stroke="transparent" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: "10px",
                  border: "none",
                  color: "#fff",
                }}
                formatter={(value) =>
                  `${new Intl.NumberFormat("vi-VN").format(value)} ₫`
                }
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5, fill: "#4f46e5" }}
                activeDot={{ r: 7, fill: "#6366f1" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* --- TỔNG DOANH THU --- */}
      <div className="text-center mt-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Tổng doanh thu (
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
                  : "chưa chọn khoảng thời gian"}
          )
        </p>
        <h3 className="text-3xl font-bold text-blue-600 mt-1">
          {new Intl.NumberFormat("vi-VN").format(totalRevenue)} ₫
        </h3>
      </div>
    </div>
  );
};

export default RevenueStatistics;
