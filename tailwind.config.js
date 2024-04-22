/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geologica", "Open Sans"],
        geologica: ["Geologica", "Open Sans"],
      },
      colors: {
        inputText: "#667085",
        inputError: "#D92D20",
        inputPlaceholder: "#667085",
        inputBorder: "#D0D5DD",
        submitBg: "#00863A",
      },
    },
  },
  plugins: [],
};
