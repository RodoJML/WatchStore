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
      fontSize: {
        '2xs': '.65rem',
        '3xs': '.5rem',
        '4xs': '.4rem',
        '5xs': '.3rem',
      },
      colors: {
        lume: {
          100: "#a3ff91",
        },
      },
      transitionProperty: {
        'right': {'transition': 'ease-in-out;', 'transition-property': 'right', 'transition-duration': '500ms'},
        'left': {'transition': 'ease-in-out'},
      },
      dropShadow: {
        '2xl-white': '0 20px 13px rgba(255, 255, 255, 0.25)',
      },
    },
  },
  plugins: [],
}

