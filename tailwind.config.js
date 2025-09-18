const colors = require("./tailwind-config/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        //from Google font
        primary_font_regular: ["Inter_400Regular"],
        primary_font_Black: ["Inter_900Black"],
        primary_font_Medium: ["Inter_500Medium"],

        //Locally use font
        Secondary_Font_Thin: ["SFUIDisplay-Thin", "sans-serif"],
        Secondary_Font_Regular: ["SFUIDisplay-Regular", "sans-serif"],
        Secondary_Font_SemiBold: ["SFUIDisplay-SemiBold", "sans-serif"],
        Secondary_Font_Bold: ["SFUIDisplay-Bold", "sans-serif"],
      },
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
};
