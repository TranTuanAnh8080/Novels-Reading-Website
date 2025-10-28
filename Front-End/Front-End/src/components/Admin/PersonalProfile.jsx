import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, User, Mail, Phone, MapPin, Lock } from "lucide-react";

const PersonalProfile = () => {
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const [user, setUser] = useState({
    fullName: "Nguyễn Minh Huy",
    email: "nguyenminhhuy@gmail.com",
    phone: "0988 123 456",
    address: "Quận 8, TP. Hồ Chí Minh",
    avatar: defaultAvatar,
  });

  const [preview, setPreview] = useState(user.avatar);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Cập nhật hồ sơ thành công 🎉");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200/60 dark:border-gray-700 p-8 max-w-4xl mx-auto"
    >
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <User className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold dark:text-white">Hồ sơ cá nhân</h2>
      </div>

      {/* AVATAR */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-26 h-26">
          <img
            src={preview || defaultAvatar}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <label
            htmlFor="avatar"
            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer transition-all"
          >
            <Camera className="text-white w-4 h-4" />
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
          Click để thay đổi ảnh đại diện
        </p>
      </div>

      {/* FORM THÔNG TIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
            Họ và tên
          </label>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2">
            <User size={18} className="text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
            Email
          </label>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
            Số điện thoại
          </label>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2">
            <Phone size={18} className="text-gray-400" />
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
            Địa chỉ
          </label>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2">
            <MapPin size={18} className="text-gray-400" />
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* NÚT LƯU */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all"
        >
          Lưu thay đổi
        </button>
      </div>

      {/* ĐỔI MẬT KHẨU */}
      <div className="border-t dark:border-gray-700 mt-10 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <Lock size={20} /> Đổi mật khẩu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 outline-none text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 outline-none text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 outline-none text-gray-800 dark:text-white"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-6 py-2 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
            Cập nhật mật khẩu
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalProfile;
