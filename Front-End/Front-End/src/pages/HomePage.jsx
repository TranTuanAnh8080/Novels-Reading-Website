import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import WelcomeSection from "../components/WelcomeSection";
import FeaturesSection from "../components/FeaturesSection";
import GenresSection from "../components/GenresSection";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 space-y-12">
        <HeroSection />
        <WelcomeSection />
        <FeaturesSection />
        <GenresSection /> 
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
