import React from "react";
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import Footer from "../components/SharedComponents/Footer";
import { User, Book, Upload, Clock, Camera, LogOut, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import image from "../assets/profile.png"
import { PiPassword } from "react-icons/pi";
import { MdPassword } from "react-icons/md";
import { useDarkMode } from "../pages/DarkModeContext";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
function Profile() {

  const { darkMode, setDarkMode } = useDarkMode();

  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '', visible: false });

  // Profile data state
  const [profileData, setProfileData] = useState({
    accountId: '',
    username: '',
    fullName: '',
    email: '',
    avatar: '',
    coin: 0,
  });


  // Form data profile
  const [formData, setFormData] = useState({
    fullName: '',
    nickname: '',
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState();

  // 📡 Lấy thông tin profile từ API
  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        // Chưa đăng nhập, chuyển về login
        navigate('/LoginPage', { replace: true });
        return;
      }

      setIsLoading(true);

      const response = await axios.get(
        'https://be-ink-realm-c7jk.vercel.app/auth/profile',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          },
          timeout: 5000,
        }
      );

      if (response.status === 200) {
        const userData = response.data;

        console.log('✅ Lấy profile thành công:', userData);
        console.log(response.data.message);

        setProfileData({
          accountId: userData.accountId,
          username: userData.username,
          fullName: userData.fullName,
          email: userData.email,
          avatar: userData.avatar || image,
          coin: userData.coin,
        });

        setFormData({
          fullName: userData.fullName,
          nickname: userData.username,
          email: userData.email,
          avatar: userData.avatar || image,
          coin: userData.coin,
        });

        setAvatarPreview(userData.avatar);

        // Cập nhật sessionStorage
        sessionStorage.setItem('user', JSON.stringify(userData));
      }

    } catch (error) {
      console.error('❌ Lỗi lấy profile:', error);

      if (error.response?.status === 401) {
        // Token hết hạn hoặc không hợp lệ
        setToast({
          type: 'error',
          message: error.response?.data?.message || error.message,
          visible: true
        });
        setTimeout(() => {
          sessionStorage.clear();
          navigate('/LoginPage', { replace: true });
        }, 2000);
      } else {
        setToast({
          type: 'error',
          message: '❌ Không thể tải thông tin profile!',
          visible: true
        });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };


  // ✅ Fetch profile data khi component mount
  useEffect(() => {
    fetchProfile();
  }, []);


  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          type: 'error',
          message: '❌ Ảnh không được vượt quá 5MB!',
          visible: true
        });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setToast({
          type: 'error',
          message: '❌ Chỉ chấp nhận file JPG, PNG, WEBP!',
          visible: true
        });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
        return;
      }

      setFormData(prev => ({
        ...prev,
        avatar: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 💾 Lưu thay đổi profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = sessionStorage.getItem('token');

      // Tạo FormData để gửi cả file và data
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('nickname', formData.nickname);

      if (formData.avatar) {
        formDataToSend.append('avatar', formData.avatar);
      }

      const response = await axios.put(
        'https://be-ink-realm-c7jk.vercel.app/auth/profile',
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        }
      );

      if (response.status === 200) {
        console.log('✅ Cập nhật profile thành công');

        setToast({
          type: 'success',
          message: '✅ Cập nhật thông tin thành công!',
          visible: true
        });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);

        // Refresh profile data
        await fetchProfile();
      }

    } catch (error) {
      console.error('❌ Lỗi cập nhật profile:', error);

      let message = '❌ Cập nhật thất bại!';
      if (error.response?.status === 401) {
        message = '🔒 Phiên đăng nhập hết hạn!';
      } else if (error.response?.status === 400) {
        message = error.response.data?.message || '❌ Dữ liệu không hợp lệ!';
      }

      setToast({
        type: 'error',
        message: message,
        visible: true
      });
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);

    } finally {
      setIsSaving(false);
    }
  };

  // 🚪 Đăng xuất
  const handleLogout = () => {
    sessionStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    navigate('/HomePage', { replace: true });
  };


  // Loading state
  if (isLoading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black dark:text-gray-500">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-700 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-300 dark:bg-dark text-lg animate-pulse ml-4">
            Đang tải thông tin...
          </p>
        </div>
      </div>
    );
  }

  {/* Toast Notification */ }
  {
    toast.visible && (
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`flex items-center px-6 py-3 rounded-md shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
          <span className="text-medium">{toast.message}</span>
          <button
            onClick={() => setToast({ ...toast, visible: false })}
            className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col">
      <HeaderProfile userData={profileData} />

      <main className="min-h-screen flex justify-center items-start py-12 px-6 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 dark:from-[#0B1120] dark:via-[#0E172A] dark:to-[#101828] transition-all duration-500">

        <div className="flex w-full max-w-6xl gap-8">
          {/* Sidebar */}
          <aside className="w-72 bg-[#111827] dark:bg-[#1E293B]/80 backdrop-blur-xl border border-gray-700/50 shadow-xl rounded-2xl p-6 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6 text-white tracking-wide">Tài khoản của tôi</h2>

            <nav className="space-y-2">
              <Link
                to="/Profile"
                className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-blue-600/20 text-blue-400 font-medium hover:bg-blue-600/30 transition"
              >
                <User className="h-5 w-5" />
                <span>Thông tin cá nhân</span>
              </Link>

              {[
                { to: '/LibraryPage', icon: <Book className="h-5 w-5" />, label: 'Tủ truyện' },
                { to: '/UploadPage', icon: <Upload className="h-5 w-5" />, label: 'Đăng truyện' },
                { to: '/PaymentItem', icon: <CreditCard className="h-5 w-5" />, label: 'Nạp xu' },
                // { to: '/TransactionPayment', icon: <Clock className="h-5 w-5" />, label: 'Lịch sử giao dịch' },
                { to: '/ChangePasswordModal', icon: <MdPassword className="h-5 w-5" />, label: 'Đổi mật khẩu' },
              ].map(({ to, icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-700/40 transition-all duration-200"
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Section */}
          <section className="flex-1 bg-[#1E293B]/70 backdrop-blur-xl border border-gray-700/40 shadow-2xl rounded-2xl p-8 transition-all duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-white">Thông tin cá nhân</h2>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-400 transition"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img
                    src={avatarPreview || profileData.avatar || defaultAvatar}
                    alt={`${profileData.fullName}'s avatar`}
                    className="w-20 h-20 rounded-full border object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = defaultAvatar; // Fallback to default image on error
                    }}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 shadow cursor-pointer transition-all"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">Ảnh đại diện</p>
                  <p className="text-xs text-gray-400">Nhấn vào biểu tượng máy ảnh để thay đổi</p>
                </div>
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-200">Tên hiển thị</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-700 bg-gray-800/70 text-gray-100 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-200">Biệt danh</label>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    className="w-full border border-gray-700 bg-gray-800/70 text-gray-100 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-1 text-gray-200">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full border border-gray-700 bg-gray-800/70 text-gray-400 rounded-lg px-3 py-2 text-sm cursor-not-allowed"
                  />
                </div>

                {/* Balance */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-1 text-gray-200">Số dư tài khoản</label>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-gray-100">
                      {profileData.coin.toLocaleString('vi-VN')} xu
                    </span>
                    <Link to="/PaymentItem">
                      <button
                        type="button"
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm transition-colors"
                      >
                        + Nạp xu
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
                    >
                      - Rút xu
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      fullName: profileData.fullName,
                      nickname: profileData.username,
                      avatar: null,
                    });
                    setAvatarPreview(profileData.avatar);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md text-sm transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-all ${isSaving
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-2 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Đang lưu...
                    </span>
                  ) : (
                    'Lưu thay đổi'
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full dark:bg-gray-700 
                   border border-gray-200 dark:border-gray-600
                  hover:scale-110 transform transition fixed top-50 right-2 m-4 bg-white"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <IoMdSunny className="text-yellow-300 w-6 h-6" />
        ) : (
          <MdDarkMode className="text-indigo-700 w-6 h-6 " />
        )}
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
