/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "gold-color": "var(--gold-color)",
        "red-color": "var(--red-color)",
      },
    },
  },
  plugins: [],
};
