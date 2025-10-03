import { createBrowserRouter } from "react-router-dom";
import Popups from "../pages/Popups";
import LoadingPage from "../pages/LoadingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordModal from "../pages/ForgotPasswordModal";
import HomePage from "../pages/HomePage";
import PaymentItem from "../pages/PaymentItem";
import HomeLoggedIn from "../pages/HomeLoggedIn";
import Profile from "../pages/Profile";
import LibraryPage from "../pages/LibraryPage";
import ChooseUploadNovel from "../pages/ChooseUploadNovel";
import UploadPage from "../pages/UploadPage";
import CodePayment from "../pages/CodePayment";
import TransactionPayment from "../pages/TransactionPayment"
import RecommendedAll from "../pages/RecommendedAll";
import BookDetail from "../pages/BookDetail";
import ChapterList from "../pages/ChapterList";
import ReadPage from "../pages/ReadPage";
import SoloLevelingSearch from "../pages/SoloLevelingSearch";

const AppRouter = createBrowserRouter([

    { path: "/", element: <Popups /> },
    { path: "/LoadingPage", element: <LoadingPage /> },
    { path: "/LoginPage", element: <LoginPage /> },
    { path: "/RegisterPage", element: <RegisterPage /> },
    { path: "/ForgotPasswordModal", element: <ForgotPasswordModal /> },
    { path: "/HomePage", element: <HomePage /> },
    { path: "/PaymentItem", element: <PaymentItem /> },
    { path: "/HomeLoggedIn", element: <HomeLoggedIn /> },
    { path: "/Profile", element: <Profile /> },
    { path: "/LibraryPage", element: <LibraryPage /> },
    { path: "/UploadNovel", element: <ChooseUploadNovel /> },
    { path: "/UploadPage", element: <UploadPage /> },
    { path: "/CodePayment", element: <CodePayment /> },
    { path: "/TransactionPayment", element: <TransactionPayment /> },
    { path: "/RecommendedAll", element: <RecommendedAll /> },
    { path: "/BookDetail/:id", element: <BookDetail /> },
    { path: "/ChapterList", element: <ChapterList /> },
    { path: "/ReadPage", element: <ReadPage /> },
    { path: "/SoloLevelingSearch", element: <SoloLevelingSearch /> }
]);

export default AppRouter;
