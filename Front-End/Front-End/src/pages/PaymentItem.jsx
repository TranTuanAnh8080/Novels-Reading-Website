
import HeaderProfile from "../components/ProfilePage/HeaderProfile";
import MainItem from "../components/PaymentItemPage/MainItem";
import Footer from "../components/SharedComponents/Footer";
import { useDarkMode } from "../pages/DarkModeContext";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
const PaymentItem = () => {

    const { darkMode, setDarkMode } = useDarkMode();
    return (
        <div className={`min-h-screen flex flex-col ${darkMode
                ? "dark:bg-gray-900 text-gray-100"
                : "bg-gradient-to-r from-sky-100 via-transparent to-rose-100 text-gray-900"
            }`}>
            <HeaderProfile />
            <MainItem />
            <Footer />
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full border border-gray-200 dark:border-gray-600 hover:scale-110 transform transition fixed top-4 right-4 bg-white dark:bg-gray-800"
                aria-label="Toggle Dark Mode"
            >
                {darkMode ? (
                    <IoMdSunny className="text-yellow-300 w-6 h-6" />
                ) : (
                    <MdDarkMode className="text-indigo-700 w-6 h-6 " />
                )}
            </button>

        </div>

    );
}

export default PaymentItem;
