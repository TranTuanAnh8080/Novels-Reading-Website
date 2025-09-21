import { createBrowserRouter } from "react-router-dom";
import Popups from "../pages/Popups";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordModal from "../pages/ForgotPasswordModal";
const AppRouter = createBrowserRouter([

    {path: "/", element: <Popups />},
    {path: "/LoadingPage", element: <LoadingPage />},
    {path: "/LoginPage", element: <LoginPage />},
    {path: "/RegisterPage", element: <RegisterPage />},
    {path: "/ForgotPasswordModal", element: <ForgotPasswordModal />}

    

]);

export default AppRouter;
