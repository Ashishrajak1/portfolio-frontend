/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enables dark/light toggle
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#a855f7", // purple accent like your design
      },
      animation: {
        "gradient-x": "gradient-x 6s infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      backgroundSize: {
        200: "200% 200%",
      },
      fontFamily: {
        "instrument-serif": ['"Instrument Serif"', "serif"],
      },
    },
  },
};
