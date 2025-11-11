import React from "react";
import { Link } from "react-router-dom";

function WelcomeSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center gap-6 dark:bg-gray-800">

      <div className="flex-1 space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">✨ Chào mừng đến với InkRealm</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Nơi bạn có thể đọc truyện chữ và nghe bằng giọng nói với chất lượng cao nhất. Khám phá hàng ngàn tác phẩm từ nhiều quốc gia khác nhau: Việt Nam, Trung Quốc, Hàn Quốc, Nhật Bản.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Đăng ký để tạo tủ truyện cá nhân, theo dõi chương mới và đăng truyện của bạn!
        </p>
        <div className="flex space-x-3 pt-3">
          <Link to= "/RegisterPage" className="px-4 py-2 bg-[#2E5BFF] text-white rounded-full text-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Đăng ký ngay
          </Link>
          <button className="px-4 py-2 border border-[#2E5BFF] rounded-full text-sm text-[#2E5BFF] hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700">
            Tìm hiểu thêm
          </button>
        </div>
      </div>

      <div className="flex-shrink-0">
        <img
          src="https://tse3.mm.bing.net/th/id/OIP.oNTrl7qPRGgBZDx6INHdtQHaE7?pid=Api&P=0&h=180"
          alt="Welcome"
          className="rounded-lg shadow"
        />
      </div>
    </section>
  );
}

export default WelcomeSection;