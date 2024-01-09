/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sveningsson: ["Sveningsson", "svenings"],
      },
      colors: {
        lume: {
          100: "#a3ff91",
        },
      },
      transitionProperty: {
        'transitionright': {'transition': 'left, 0.5s, ease-in-out'},
      },
    },
  },
  plugins: [],
}

