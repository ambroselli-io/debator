const theme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", ...theme.fontFamily.sans],
      sansSerif: theme.fontFamily.sans,
      marker: ["Permanent Marker", ...theme.fontFamily.sans],
    },
    extend: {
      colors: {
        app: "#ed8550",
      },
      borderColor: {
        DEFAULT: "#000",
      },
      aspectRatio: {
        link: "auto 480 / 250",
      },
      height: {
        "screen-4/5": "80vh",
        "screen-1/2": "50vh",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/line-clamp")],
};
