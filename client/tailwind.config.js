/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",


  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    screens: {
      sm: "576px",
      "sm-max": { max: "576px" },
      md: "768px",
      "md-max": { max: "768px" },
      lg: "992px",
      "lg-max": { max: "992px" },
      xl: "1200px",
      "xl-max": { max: "1200px" },
      "2xl": "1320px",
      "2xl-max": { max: "1320px" },
    },
    extend: {
      colors: {
        primary:'#344767',
        secondary:'#0B1222',
        lightSecondary:'#A2F4F0',
        danger: '#F45A4F',
        warning: 'orange',
        info: '#60A5FA',
        link:'#4560CB',
        tprimary:'black',
        tsecondary:'#334155'
      },
      backgroundColor:{
        bgg:"#0B1222"
      }
    },
  },
  plugins: [],
}

