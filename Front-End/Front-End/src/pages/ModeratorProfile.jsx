import MoHeader from "../components/ModeratorHomePage/MoHeader";
import React from "react";
import Footer from "../components/SharedComponents/Footer";
import Profile from "../components/ModeratorProfile/ModeratorProfile"
const ModeratorProfile = () => {
  return (
    <div className="flex flex-col min-h-screen
         bg-gray-50 dark:bg-gray-900 max-w-screen overflow-x-hidden">
      <MoHeader />
      <Profile />
      <Footer />
    </div>
  );
};

export default ModeratorProfile;