import React from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import Footer from "../components/Footer";
import { User, Book, Upload, Clock, Camera, LogOut, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HeaderProfile />

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-1 space-x-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Tài khoản của tôi</h2>
          <nav className="space-y-3">
            <Link to="/Profile" className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md bg-blue-50 text-blue-600 font-medium">
              <User className="h-4 w-4" />
              <span>Thông tin cá nhân</span>
            </Link>
            <Link to="/LibraryPage" className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <Book className="h-4 w-4" />
              <span>Tủ truyện</span>
            </Link>
            <Link to="/UploadPage"
              className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <Upload className="h-4 w-4" />
              <span>Đăng truyện</span>
            </Link>

            <Link to="/PaymentItem"
              className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <CreditCard className="h-4 w-4" />
              <span>Nạp xu</span>
            </Link>

            <button className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <Clock className="h-4 w-4" />
              <span>Lịch sử giao dịch</span>
            </button>
          </nav>
        </aside>

        {/* Profile form */}
        <section className="flex-1 bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Thông tin cá nhân</h2>
            <Link
              to="/HomePage"
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </Link>
          </div>

          <form className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="avatar"
                  className="w-20 h-20 rounded-full border"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                >
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Ảnh đại diện</p>
                <p className="text-gray-400 text-xs">
                  Nhấn vào biểu tượng máy ảnh để thay đổi
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  defaultValue={"Nguyễn Minh Anh"}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Biệt danh
                </label>
                <input
                  type="text"
                  defaultValue={"Rose"}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Biệt hiệu</label>
                <select className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2
                 focus:ring-blue-500 focus:outline-none">
                  <option>Biệt hiệu</option>
                  <option>Độc giả</option>
                  <option>Tác giả</option>
                  <option>Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                <div className="grid grid-cols-3 gap-2">
                  <select className="border rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Ngày</option>
                  </select>
                  <select className="border rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Tháng</option>
                  </select>
                  <select className="border rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option>Năm</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={"nguyenminhanh@gmail.com"}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                  disabled
                />
              </div>

              {/* Balance */}
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Số dư tài khoản
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-gray-800">
                    14.000 xu
                  </span>
                  <Link to="/PaymentItem">
                    <button
                      type="button"
                      className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                    >
                      + Nạp xu
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                  >
                    - Rút xu
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
