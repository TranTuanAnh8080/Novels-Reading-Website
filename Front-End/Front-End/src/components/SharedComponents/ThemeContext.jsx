import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Tạo Context
const ThemeContext = createContext();

// 2. Tạo Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Ưu tiên 1: Lấy theme từ localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Ưu tiên 2: Kiểm tra cài đặt hệ thống (nếu trình duyệt hỗ trợ)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    // Mặc định: 'light'
    return 'light';
  });

  // 3. Xử lý logic khi theme thay đổi
  useEffect(() => {
    const root = window.document.documentElement; // Thẻ <html>

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Lưu lựa chọn vào localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Hàm để chuyển đổi theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Tạo một custom hook để dễ dàng sử dụng
export const useTheme = () => {
  return useContext(ThemeContext);
};