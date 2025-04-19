import colors from "tailwindcss/colors";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors:{
       ...colors,
      stone: colors.stone,
      red: colors.red
      }
    },
  },
  plugins: [],
}
