import React from "react";
import Footer from "../components/Footer";
import MoHeader from "../components/ModeratorHomePage/MoHeader";
import MoMainItem from "../components/ModeratorHomePage/MoMainItem";
const ModeratorHomePage = () => {

    return (
        <div className="flex flex-col min-h-screen
         bg-gray-50 dark:bg-gray-900 max-w-screen overflow-x-hidden">
            {/* Header */}
            <MoHeader />
            {/* Hero / Main */}
            <MoMainItem />
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ModeratorHomePage;
