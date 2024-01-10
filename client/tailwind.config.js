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
      // Add more lefft properties here
      left: {
        'sideMenu': '-19rem',
      }
    },
  },
  plugins: [],
}

