import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, User, Mail, Phone, MapPin, Lock, Coins } from "lucide-react";

const PersonalProfile = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    coin: 0,
  });

  const [preview, setPreview] = useState(defaultAvatar);
  const [loading, setLoading] = useState(true);

  // 📡 Fetch Profile API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.warn("⚠️ No token found in sessionStorage");
          setLoading(false);
          return;
        }

        const response = await fetch("https://be-ink-realm-c7jk.vercel.app/auth/profile", {
          method: "GET",
          headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("❌ Failed to fetch profile:", response.status);
          setLoading(false);
          return;
        }

        const data = await response.json();
        // Gán dữ liệu nhận được từ API
        setUser({
          fullName: data.fullName || data.username || "Người dùng InkRealm",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          avatar: data.avatar || defaultAvatar,
          coin: data.coin || 0,
        });
        setPreview(data.avatar || defaultAvatar);
      } catch (error) {
        console.error("🚨 Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 📸 Thay đổi ảnh đại diện
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

  if (loading) {
    return (
      <div className="flex justify-center mt-20 items-center h-64 text-gray-500">
        Đang tải thông tin người dùng...
      </div>
    );
  }

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
        <div className="relative w-28 h-28">
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

        <div>
          <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">
            Số dư xu
          </label>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2">
            <Coins size={18} className="text-yellow-500" />
            <input
              type="text"
              value={`${user.coin} xu`}
              disabled
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white cursor-not-allowed"
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
      {/* ĐỔI MẬT KHẨU */}
      <div className="border-t dark:border-gray-700 mt-10 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <Lock size={20} /> Đổi mật khẩu
        </h3>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 outline-none text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 outline-none text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 outline-none text-gray-800 dark:text-white"
          />
        </div>

        {/* Animated Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 px-4 py-2 rounded-xl text-sm font-medium ${messageType === "success"
                  ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={async () => {
              setMessage(null);

              if (!oldPassword || !newPassword || !confirmPassword) {
                setMessageType("error");
                setMessage("Vui lòng nhập đầy đủ thông tin!");
                setTimeout(() => setMessage(null), 2000);
                return;
              }

              if (newPassword !== confirmPassword) {
                setMessageType("error");
                setMessage("Mật khẩu mới không khớp!");
                setTimeout(() => setMessage(null), 2000);
                return;
              }

              const token = sessionStorage.getItem("token");
              if (!token) {
                setMessageType("error");
                setMessage("Bạn chưa đăng nhập!");
                setTimeout(() => setMessage(null), 2000);
                return;
              }

              try {
                const res = await fetch(
                  "https://be-ink-realm-c7jk.vercel.app/auth/change-password",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      oldPassword,
                      newPassword,
                    }),
                  }
                );

                const data = await res.json();

                // ✅ Xử lý phản hồi
                if (res.ok) {
                  setMessageType("success");
                  setMessage("Đổi mật khẩu thành công 🎉");
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");

                  // Ẩn message + đăng xuất sau 2s
                  setTimeout(() => {
                    setMessage(null);
                    sessionStorage.removeItem("token");
                    window.location.href = "/LoginPage";
                  }, 2000);
                } else if (res.status === 400) {
                  setMessageType("error");
                  setMessage("Mật khẩu cũ không đúng hoặc thiếu dữ liệu ❌");
                  setTimeout(() => setMessage(null), 2000);
                } else if (res.status === 401) {
                  setMessageType("error");
                  setMessage("Token không hợp lệ hoặc chưa đăng nhập ❌");
                  setTimeout(() => setMessage(null), 2000);
                } else if (res.status === 404) {
                  setMessageType("error");
                  setMessage("Người dùng không tồn tại ❌");
                  setTimeout(() => setMessage(null), 2000);
                } else if (res.status === 500) {
                  setMessageType("error");
                  setMessage("Lỗi máy chủ, vui lòng thử lại sau ❌");
                  setTimeout(() => setMessage(null), 2000);
                } else {
                  setMessageType("error");
                  setMessage(data.error || "Đổi mật khẩu thất bại ❌");
                  setTimeout(() => setMessage(null), 2000);
                }
              } catch (error) {
                setMessageType("error");
                setMessage("Không thể kết nối đến máy chủ ❌");
                setTimeout(() => setMessage(null), 2000);
              }
            }}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-6 py-2 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalProfile;
