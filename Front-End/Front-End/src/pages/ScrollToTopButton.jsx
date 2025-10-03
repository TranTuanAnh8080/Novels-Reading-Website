import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 200); // cho hiển thị nút khi cuộn xuống quá 200px
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return show ? (
        <button
            onClick={scrollToTop}
            className="fixed bottom-7 left-6 z-50 bg-blue-500 text-white px-3 
            py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all flex items-center font-semibold text-s"
            aria-label="Scroll to top"
        >
            <svg className="w-6 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    ) : null;
};

export default ScrollToTopButton;