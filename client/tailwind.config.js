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
      spacing: {
        '0.25': '0.0625rem',
      },
      colors: {
        lume: {
          100: "#a3ff91",
        },
        amberspecial: {
          100: "#F9C333",
        
        },
        limegreen:{
          100: "#0AD218",
        
        },
        screaminGreen: {
          100: "#8EFF73",
        },
        bone:{
          100: "#D9D8C4",
        
        },
        pearl: {
          100: "#D6D7C2",
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
        '100': '25rem',
        '101': '25.25rem',
        '102': '25.5rem',
        '103': '25.75rem',
        '104': '26rem',
        '105': '26.25rem',
        '106': '26.5rem',
        '107': '26.75rem',
        '108': '27rem',
        '109': '27.25rem',
        '110': '27.5rem',
        '41': '10.25rem',
        '42': '10.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-at-t': 'radial-gradient(at top, var(--tw-gradient-stops))',
        'gradient-radial-at-tr': 'radial-gradient(at top right, var(--tw-gradient-stops))',
        'gradient-radial-at-r': 'radial-gradient(at right, var(--tw-gradient-stops))',
        'gradient-radial-at-br': 'radial-gradient(at bottom right, var(--tw-gradient-stops))',
        'gradient-radial-at-b': 'radial-gradient(at bottom, var(--tw-gradient-stops))',
        'gradient-radial-at-bl': 'radial-gradient(at bottom left, var(--tw-gradient-stops))',
        'gradient-radial-at-l': 'radial-gradient(at left, var(--tw-gradient-stops))',
        'gradient-radial-at-tl': 'radial-gradient(at top left, var(--tw-gradient-stops))',
        'wooden-pattern': 'url("/src/assets/images/wood.jpg")',
      },
      backgroundSize: {
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
        'sm' : '100px 100px',
        'md' : '200px 200px',
        'lg' : '300px 300px',
        'xl' : '400px 400px',
        '2xl' : '500px 500px',
        '3xl' : '600px 600px',
        '4xl' : '700px 700px',
      },
      aspectRatio : {
        '364/45': '364/45',
      },
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

