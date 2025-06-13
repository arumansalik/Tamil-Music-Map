/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // ✅ App Router support
    "./components/**/*.{js,ts,jsx,tsx}",// ✅ Components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
