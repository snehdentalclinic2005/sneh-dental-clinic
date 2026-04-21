/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'nav': '0 4px 20px -2px rgba(11, 94, 142, 0.1)',
        'card': '0 8px 30px -4px rgba(11, 94, 142, 0.08)',
      }
    },
  },
  plugins: [],
}