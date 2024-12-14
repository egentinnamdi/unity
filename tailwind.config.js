/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        search: "rgba(245, 246, 250, 1)",
        primary: "rgba(18, 18, 18, 1)",
        secondary: "rgba(122, 0, 163, 1)",
        ui: "rgba(255, 51, 71, 1)",
        nav: "rgba(1, 119, 253, 1)",
        superNav: "rgba(58, 54, 219, 1)",
      },
    },
  },
  plugins: [],
};
