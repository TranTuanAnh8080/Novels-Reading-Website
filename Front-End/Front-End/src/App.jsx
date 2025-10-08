import React from 'react'
import AppRouter from '../src/routes'
import { RouterProvider } from 'react-router-dom';
import ScrollToTopButton from './pages/ScrollToTopButton';
import ChatBot from './components/SharedComponents/ChatBot';
function App() {

  return (
    <>
    
      <RouterProvider router={AppRouter} />
      <ScrollToTopButton />
      <ChatBot />
    </>
  )
}

export default App
