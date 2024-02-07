/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "primary-violet-300": "#4C14A5",
        "primary-violet-100": "#A82CA8",
        "primary-red-300": "#9B093C",
        "primary-white": "#F1ECDB",
        "primary-gray-300": "#AB9E85",
        "primary-gray-100": "#C3A687",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
}
