import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: `
          0px 2px 3px -1px rgba(186, 167, 22, 0.5),
          0px 1px 0px 0px rgba(181, 13, 52, 0.3),
          0px 0px 0px 1px rgba(181, 13, 52, 0.1),
          0px 4px 8px -2px rgba(186, 167, 22, 0.3),
          0px 4px 12px 0px rgba(181, 13, 52, 0.3)
        `,
      },
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
      animation: {},
      screens: {
        // For 3xl screen: width between 1024px and 1280px, height between 700px and 1100px
        "3xl": { raw: "(min-width: 1023px) and (max-width: 1280px)" },
        // For 4xl screen: width between 1280px and 1536px, height between 700px and 1100px
        "4xl": { raw: "(min-width: 1281px) and (max-width: 1550px)" },
        // // For 5xl screen: width above 1536px, height between 700px and 1100px
        "5xl": {
          raw: "(min-width: 1600px) and (min-height: 700px) and (max-height: 1100px)",
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
