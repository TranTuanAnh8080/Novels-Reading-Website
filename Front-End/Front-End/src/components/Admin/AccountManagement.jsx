import React, { useState, useEffect } from "react";
import { Search, Edit, Trash2, PlusCircle, UserPlus, X, AlertCircle, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Component con: Modal Tạo Tài khoản ---
const CreateAccountModal = ({ show, onClose, onSubmit, newAccount, setNewAccount, errorMessage }) => {
  if (!show) return null;

  return (

    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative transform transition-all duration-300"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6 dark:text-white text-center text-gray-900">
              🧑‍💼 Tạo tài khoản nội bộ
            </h2>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center gap-2 mb-4"
                role="alert"
              >
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{errorMessage}</span>
              </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  value={newAccount.username}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, username: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  value={newAccount.password}
                  onChange={(e) =>
                    setNewAccount({ ...newAccount, password: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  value={newAccount.confirmPassword}
                  onChange={(e) =>
                    setNewAccount({
                      ...newAccount,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium transition duration-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-medium transition duration-200 flex items-center gap-1"
                >
                  <PlusCircle className="w-5 h-5" />
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Component Chính: AccountManagement ---
const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Fake data ban đầu
  useEffect(() => {
    setAccounts([
      { id: 1, username: "admin01", role: "Admin", status: "Active" },
      { id: 2, username: "mod02", role: "Moderator", status: "Active" },
      { id: 3, username: "editor03", role: "Editor", status: "Active" },
      { id: 4, username: "banneduser", role: "Customer", status: "Banned" },
    ]);
  }, []);

  // Lọc danh sách theo từ khóa
  const filteredAccounts = accounts.filter((acc) =>
    acc.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!newAccount.username || !newAccount.password || !newAccount.confirmPassword) {
      setErrorMessage("Vui lòng điền đầy đủ tất cả các trường!");
      return;
    }
    if (newAccount.password !== newAccount.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (newAccount.password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Kiểm tra trùng tên đăng nhập
    if (accounts.some(acc => acc.username.toLowerCase() === newAccount.username.toLowerCase())) {
      setErrorMessage("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
      return;
    }

    const newAcc = {
      id: accounts.length > 0 ? Math.max(...accounts.map(acc => acc.id)) + 1 : 1,
      username: newAccount.username,
      role: "Moderator",
      status: "Active",
    };
    setAccounts([...accounts, newAcc]);
    setShowModal(false);
    setNewAccount({ username: "", password: "", confirmPassword: "" });
    setErrorMessage("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    setErrorMessage("");
    setNewAccount({ username: "", password: "", confirmPassword: "" });
  }

  return (
    <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" />
          Quản lý tài khoản nội bộ
        </h1>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          Tạo tài khoản
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="relative mb-6">
        <Search className="w-5 h-5 text-gray-400 dark:text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên đăng nhập, vai trò, trạng thái..."
          className="pl-10 pr-4 w-full md:w-105 p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white shadow-sm transition duration-150"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bảng tài khoản */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
          <thead className="bg-blue-600 dark:bg-blue-800 text-white">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold tracking-wider">ID</th>
              <th className="py-4 px-6 text-left text-sm font-semibold tracking-wider">Tên đăng nhập</th>
              <th className="py-4 px-6 text-left text-sm font-semibold tracking-wider">Vai trò</th>
              <th className="py-4 px-6 text-left text-sm font-semibold tracking-wider">Trạng thái</th>
              <th className="py-4 px-6 text-center text-sm font-semibold tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc) => (
              <tr
                key={acc.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td className="py-3.5 px-6 text-sm">{acc.id}</td>
                <td className="py-3.5 px-6 font-medium text-gray-900 dark:text-white">{acc.username}</td>
                <td className="py-3.5 px-6 text-sm">{acc.role}</td>
                <td
                  className={`py-3.5 px-6 font-semibold text-sm ${acc.status === "Active"
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                    }`}
                >
                  {acc.status}
                </td>
                <td className="py-3.5 px-6 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                      title="Chỉnh sửa"
                    // Thêm logic chỉnh sửa tài khoản tại đây
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition"
                      title="Xóa tài khoản"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500 dark:text-gray-400 text-base">
                  Không có tài khoản nào phù hợp với tìm kiếm của bạn.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal tạo tài khoản nội bộ */}
      <CreateAccountModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateAccount}
        newAccount={newAccount}
        setNewAccount={setNewAccount}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default AccountManagement;