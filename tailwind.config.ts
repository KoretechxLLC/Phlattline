import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        arrow: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "40%": { opacity: "1", transform: "translateX(0)" },
          "80%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
        },
      },
      animation: {
        arrow: "arrow 2s infinite",
      },
      screens: {
        // For 3xl screen: width between 1024px and 1280px, height between 700px and 1100px
        "3xl": { raw: "(min-width: 1023px) and (max-width: 1280px)" },
        // For 4xl screen: width between 1280px and 1536px, height between 700px and 1100px
        "4xl": { raw: "(min-width: 1281px) and (max-width: 1550px)" },
        // // For 5xl screen: width above 1536px, height between 700px and 1100px
        // '5xl': { 'raw': '(min-width: 1536px) and (min-height: 700px) and (max-height: 1100px)' },
      },
    },
  },
  plugins: [],
};

export default config;
