import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const revenueData = {
  week: [
    { name: "Thứ 2", revenue: 500000 },
    { name: "Thứ 3", revenue: 200000 },
    { name: "Thứ 4", revenue: 400000 },
    { name: "Thứ 5", revenue: 350000 },
    { name: "Thứ 6", revenue: 375000 },
    { name: "Thứ 7", revenue: 460000 },
    { name: "Chủ nhật", revenue: 120000 },
  ],
  month: [
    { name: "Tuần 6", revenue: 150000 },
    { name: "Tuần 7", revenue: 200000 },
    { name: "Tuần 8", revenue: 570000 },
    { name: "Tuần 9", revenue: 430000 },
    { name: "Tuần 10", revenue: 1000000 },
  ],
  year: [
    // { name: "Th1", revenue: 85000000 },
    // { name: "Th2", revenue: 92000000 },
    // { name: "Th3", revenue: 78000000 },
    // { name: "Th4", revenue: 101000000 },
    // { name: "Th5", revenue: 99000000 },
    // { name: "Th6", revenue: 113000000 },
  ],
};

const RevenueStatistics = () => {
  const [range, setRange] = useState("week");

  const totalRevenue = revenueData[range].reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="bg-white mt-17 dark:bg-gray-800 rounded-xl shadow-md border border-gray-200/60 dark:border-gray-700 p-6">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-white">
          📈 Thống kê doanh thu
        </h2>
        <div className="flex gap-2">
          {["week", "month", "year"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                range === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              {r === "week" ? "Tuần" : r === "month" ? "Tháng" : "Năm"}
            </button>
          ))}
        </div>
      </div>

      {/* --- LINE CHART --- */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData[range]}>
            <CartesianGrid strokeDasharray="0" stroke="transparent" /> {/* ❌ bỏ grid */}
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
      </div>

      {/* --- TOTAL --- */}
      <div className="text-center mt-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Tổng doanh thu (
          {range === "week" ? "tuần" : range === "month" ? "tháng" : "năm"} này)
        </p>
        <h3 className="text-3xl font-bold text-blue-600 mt-1">
          {new Intl.NumberFormat("vi-VN").format(totalRevenue)} ₫
        </h3>
      </div>
    </div>
  );
};

export default RevenueStatistics;
