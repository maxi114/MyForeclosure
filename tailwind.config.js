/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // For Next.js
    './components/**/*.{js,ts,jsx,tsx}', // For components
    './app/**/*.{js,ts,jsx,tsx}', // For app directory if using it
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

