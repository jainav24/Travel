/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Montserrat'", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#ff6b2c",
          light: "#ff9a5c",
          dark: "#0a0806",
        },
      },
    },
  },
  plugins: [],
};
