export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
    extend: {
          animation: {
          typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
        },
        
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
        },
        keyframes: {
            fadeIn: {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
            },
        },
    },
};
export const plugins = [];