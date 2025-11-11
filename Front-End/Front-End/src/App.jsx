import React from 'react'
import AppRouter from '../src/routes'
import { RouterProvider } from 'react-router-dom';
import ScrollToTopButton from './pages/ScrollToTopButton';
import ChatBot from './components/SharedComponents/ChatBot';
import { ThemeProvider } from './components/SharedComponents/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <RouterProvider router={AppRouter} />
      <ScrollToTopButton />
      <ChatBot />
    </ThemeProvider>
  )
}

export default App