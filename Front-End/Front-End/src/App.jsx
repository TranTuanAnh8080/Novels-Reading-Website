import React from 'react'
import AppRouter from '../src/routes'
import { RouterProvider } from 'react-router-dom';
import ScrollToTopButton from './pages/ScrollToTopButton';
import ChatBot from './components/SharedComponents/ChatBot';
// 1. Import ThemeProvider
import { ThemeProvider } from './components/SharedComponents/ThemeContext';

function App() {

  return (
    // 2. Bọc toàn bộ ứng dụng của bạn trong ThemeProvider
    <ThemeProvider>
      <RouterProvider router={AppRouter} />
      <ScrollToTopButton />
      <ChatBot />
    </ThemeProvider>
  )
}

export default App