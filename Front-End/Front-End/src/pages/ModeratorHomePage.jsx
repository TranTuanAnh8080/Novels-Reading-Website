import React from "react";
import Footer from "../components/Footer";
import MoHeader from "../components/ModeratorHomePage/MoHeader";
import MoMainItem from "../components/ModeratorHomePage/MoMainItem";
import { useDarkMode } from "../pages/DarkModeContext";
import { IoMdSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
const ModeratorHomePage = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    return (
        <div className="flex flex-col min-h-screen
         bg-gray-50 dark:bg-gray-900 max-w-screen overflow-x-hidden">
            {/* Header */}
            <MoHeader />
            {/* Hero / Main */}
            <MoMainItem />
            {/* Footer */}
            <Footer />

            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full dark:bg-gray-700 
                   border border-gray-200 dark:border-gray-600
                  hover:scale-110 transform transition fixed top-50 right-2 m-4 bg-white"
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
};

export default ModeratorHomePage;
