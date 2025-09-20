import { createBrowserRouter } from "react-router-dom";
import Popups from "../pages/Popups";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/LoginPage";
const AppRouter = createBrowserRouter([

    {path: "/", element: <Popups />},
    {path: "/LoadingPage", element: <LoadingPage />},
    {path: "/LoginPage", element: <LoginPage />},

]);

export default AppRouter;
