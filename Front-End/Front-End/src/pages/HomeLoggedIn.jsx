import React from "react";
import HeaderLoggedIn from "../components/HomeLoggedInPage/HeaderLoggedIn";
import HeroBanner from "../components/HomeLoggedInPage/HeroBanner";
import HeroSection from "../components/HomePage/HeroSection";
import ReadingSection from "../components/HomeLoggedInPage/ReadingSection";
import RecommendedSection from "../components/HomeLoggedInPage/RecommendedSection";
import Footer from "../components/SharedComponents/Footer";

function HomeLoggedIn() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderLoggedIn />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-10"> 
          <HeroBanner />
        </div>
        <HeroSection />
        <ReadingSection />
        <RecommendedSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomeLoggedIn;
