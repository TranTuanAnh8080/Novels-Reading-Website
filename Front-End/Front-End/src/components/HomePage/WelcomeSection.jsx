import React from "react";

function WelcomeSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center gap-6">
      {/* Left text */}
      <div className="flex-1 space-y-3">
        <h2 className="text-lg font-semibold">✨ Chào mừng đến với InkRealm</h2>
        <p className="text-sm text-gray-600">
          Nơi bạn có thể đọc truyện chữ và nghe bằng giọng nói với chất lượng cao nhất. Khám phá hàng ngàn tác phẩm từ nhiều quốc gia khác nhau: Việt Nam, Trung Quốc, Hàn Quốc, Nhật Bản.
        </p>
        <p className="text-sm text-gray-600">
          Đăng ký để tạo tủ truyện cá nhân, theo dõi chương mới và đăng truyện của bạn!
        </p>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700">
            Đăng ký ngay
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
      {/* Right image */}
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
