/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Adding font sveningsson
        sveningsson: ["Sveningsson", "svenings"],
      },
      colors: {
        lume: {
          100: "#a3ff91",
        },
      },
    },
  },
  plugins: [],
}

