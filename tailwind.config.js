/** @type {import('tailwindcss').Config} */
export default {
   darkMode: "class", // ✅ AD
  content: [ 
    "./index.html",      // Vite entry
    "./src/**/*.{js,jsx,ts,tsx}" // All source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}