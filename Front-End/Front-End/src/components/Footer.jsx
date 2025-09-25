import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logo from "../assets/inkrealm_logo.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + desc */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <img src={logo} alt="InkRealm" className="h-8 w-auto" />
          </div>
          <p className="text-sm">
            Nền tảng đọc truyện chữ hàng đầu Việt Nam, với hàng ngàn tác phẩm từ nhiều quốc gia và nền văn hóa.
          </p>
          <div className="flex space-x-3 mt-3">
            <Facebook className="h-5 w-5 hover:text-white cursor-pointer" />
            <Twitter className="h-5 w-5 hover:text-white cursor-pointer" />
            <Instagram className="h-5 w-5 hover:text-white cursor-pointer" />
            <Mail className="h-5 w-5 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Columns */}
        <div>
          <h3 className="font-semibold text-white mb-3">Khám Phá</h3>
          <ul className="space-y-2 text-sm">
            <li>Truyện Hot</li>
            <li>Mới Cập Nhật</li>
            <li>Hoàn Thành</li>
            <li>Thể Loại</li>
            <li>Tác Giả</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Hỗ Trợ</h3>
          <ul className="space-y-2 text-sm">
            <li>Trợ Giúp</li>
            <li>Điều Khoản Sử Dụng</li>
            <li>Chính Sách Bảo Mật</li>
            <li>Báo Lỗi</li>
            <li>Liên Hệ</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-3">Tài Khoản</h3>
          <ul className="space-y-2 text-sm">
            <li>Đăng Nhập</li>
            <li>Đăng Ký</li>
            <li>Quên Mật Khẩu</li>
            <li>Đăng Truyện</li>
            <li>Tủ Truyện</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-xs">
        © 2025 InkRealm. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
}

export default Footer;
