import React from "react";
import image from "../assets/inkrealm_logo.png";
const LoadingPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center text-center justify-center 
        bg-gradient-to-br from-rose-200 via-rose-50 to-sky-200 animate-pulse"
        >
            <img
                src={image}
                alt="Inkrealm Logo"
                className="h-20 w-auto mb-3 animate-pulse contrast-125 saturate-150 brightness-90 mr-5"
            />
            {/* Spinner */}
            <div class='flex space-x-2 justify-center items-center mb-5'>
                <span class='sr-only'>Loading...</span>
                <div class='h-3 w-2 bg-cyan-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div class='h-3 w-2 bg-rose-300 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div class='h-3 w-2 bg-sky-200 rounded-full animate-bounce'></div>
            </div>
            <p className="text-xl font-medium animate-pulse text-sky-800">
                "⭐Nơi cảm xúc vỡ òa trong từng chương chữ🌸"
            </p>
        </div>
    );
};

export default LoadingPage;