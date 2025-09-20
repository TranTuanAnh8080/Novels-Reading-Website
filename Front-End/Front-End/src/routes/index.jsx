import { createBrowserRouter } from "react-router-dom";
import Popups from "../pages/Popups";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
const AppRouter = createBrowserRouter([

    {path: "/", element: <Popups />},
    {path: "/LoadingPage", element: <LoadingPage />},
    {path: "/LoginPage", element: <LoginPage />},
    {path: "/RegisterPage", element: <RegisterPage />},

    

]);

export default AppRouter;
