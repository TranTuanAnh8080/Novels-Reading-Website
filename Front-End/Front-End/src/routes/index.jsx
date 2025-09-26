import { createBrowserRouter } from "react-router-dom";
import Popups from "../pages/Popups";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordModal from "../pages/ForgotPasswordModal";
import HomePage from "../pages/HomePage";
import HomeLoggedIn from "../pages/HomeLoggedIn";
import Profile from "../pages/Profile";
import LibraryPage from "../pages/LibraryPage";
const AppRouter = createBrowserRouter([

    {path: "/", element: <Popups />},
    {path: "/LoadingPage", element: <LoadingPage />},
    {path: "/LoginPage", element: <LoginPage />},
    {path: "/RegisterPage", element: <RegisterPage />},
    {path: "/ForgotPasswordModal", element: <ForgotPasswordModal />},
    {path: "/HomePage", element: <HomePage /> },
    {path: "/HomeLoggedIn", element: <HomeLoggedIn /> },
    {path: "/Profile", element: <Profile /> },
    {path: "/LibraryPage", element: <LibraryPage /> },   

]);

export default AppRouter;
