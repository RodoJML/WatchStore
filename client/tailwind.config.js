/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
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
        '1vw': '1vw',
        '1.5vw': '1.5vw',
        '2vw': '2vw',
        '2.5vw': '2.5vw',
        '3vw': '3vw',
        '3.5vw': '3.5vw',
        '4vw': '4vw',
        '4.5vw': '4.5vw',
        '5vw': '5vw',
        '5.5vw': '5.5vw',
        "6vw": "6vw",
        '6.5vw': '6.5vw',
        "10vw": "10vw",
        "15vw": "15vw",
        "20vw": "20vw",
        "25vw": "25vw",
        "30vw": "30vw",
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
        '2xl-white2': '0 20px 13px rgba(255, 255, 255, 0.6)',
      },
      textShadow: {
        sm: '0 0px 2px var(--tw-shadow-color)',
        DEFAULT: '0 0px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      width: {
        '1vw': '1vw',
        '2vw': '2vw',
        '3vw': '3vw',
        '4vw': '4vw',
        '5vw': '5vw',
        "5vw": "5vw",
        "10vw": "10vw",
        "15vw": "15vw",
        "20vw": "20vw",
        "25vw": "25vw",
        "30vw": "30vw",
        '45vw': '45vw',
        '50vw': '50vw',
        '55vw': '55vw',
        '60vw': '60vw',
        '65vw': '65vw',
        '70vw': '70vw',
        '75vw': '75vw',
        '80vw': '80vw',
        '85vw': '85vw',
        '90vw': '90vw',
        '95vw': '95vw',
        '100vw': '100vw',
      },
      height: {
        '1vw': '1vw',
        '2vw': '2vw',
        '3vw': '3vw',
        '4vw': '4vw',
        '5vw': '5vw',
        "5vw": "5vw",
        "10vw": "10vw",
        "15vw": "15vw",
        "20vw": "20vw",
        "25vw": "25vw",
        "30vw": "30vw",
        '45vw': '45vw',
        '50vw': '50vw',
        '55vw': '55vw',
        '60vw': '60vw',
        '65vw': '65vw',
        '70vw': '70vw',
        '75vw': '75vw',
        '80vw': '80vw',
        '85vw': '85vw',
        '90vw': '90vw',
        '95vw': '95vw',
        '100vw': '100vw',
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

