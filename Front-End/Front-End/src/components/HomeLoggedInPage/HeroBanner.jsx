import React, { useState, useEffect } from "react";
import pic1 from "../../assets/pic1.jpg";
import pic2 from "../../assets/pic2.jpg";
import pic4 from "../../assets/pic4.jpg";
import pic5 from "../../assets/pic5.jpg";
import bgmoderator3 from "../../assets/bgmoderator2.png";
// Định nghĩa danh sách các URL hình ảnh
const images = [
  bgmoderator3,
  pic1,
  pic2,
  pic4,
  pic5,
];

const SLIDE_INTERVAL = 2000;

function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-screen h-127 overflow-hidden animate-pulse mt-5">
      <img
        src={images[currentImageIndex]}
        alt={`Banner ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out brightness-105 contrast-75 saturate-200"
      />
    </div>
  );
}

export default HeroBanner;