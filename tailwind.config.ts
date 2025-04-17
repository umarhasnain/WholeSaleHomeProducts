/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./app/**/*.{ts,tsx}",   // App Router
      "./pages/**/*.{ts,tsx}", // Pages Router
      "./components/**/*.{ts,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  export default config;
  