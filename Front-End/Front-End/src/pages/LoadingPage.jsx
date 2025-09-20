import React from "react";
import image from "../assets/inkrealm_logo.png";
const LoadingPage = () => { 
    return (
        <div className="relative inset-0 z-50 flex flex-col items-center text-center justify-center 
        bg-gradient-to-br from-zinc-100 via-sky-100 to-red-100"
        >
            <img
                src={image}
                alt="Inkrealm Logo"
                className="h-15 w-auto mb-6 animate-pulse contrast-125 saturate-150 brightness-90"
            />
            {/* Spinner */}
            <div class='flex space-x-2 justify-center items-center'>
                <span class='sr-only'>Loading...</span>
                <div class='h-4 w-4 bg-sky-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div class='h-4 w-4 bg-sky-700 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div class='h-4 w-4 bg-sky-700 rounded-full animate-bounce'></div>
            </div>
            <p className="mt-5 text-lg font-medium font-mono animate-pulse text-sky-800">
                "Nơi cảm xúc vỡ òa trong từng chương chữ"
            </p>
        </div>
    );
};

export default LoadingPage;