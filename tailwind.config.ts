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
        "copy":"url('/images/Copy.svg')",
        "logo":"url('/images/Logo.svg')",
        "expand":"url('/images/Expand_down.svg')",
        "horizon":"url('/images/Horizontal_top_left_main.svg')",
        "hero":"url('/images/hero_img.img')",
        "sort":"url('/images/Sort_alfa.svg')",
        "sound":"url('/images/sound_max_fill.svg')"
      },
      fontFamily:{
        dm:['DM Sans','sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
