import React from 'react'
import AppRouter from '../src/routes'
import { RouterProvider } from 'react-router-dom';
import ScrollToTopButton from './pages/ScrollToTopButton';
function App() {

  return (
    <>
      <RouterProvider router={AppRouter} />
      <ScrollToTopButton />
    </>
  )
}

export default App
