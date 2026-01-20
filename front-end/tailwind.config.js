// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald"],   // ✅ key matches usage
      },
    },
  },
  plugins: [],
}
