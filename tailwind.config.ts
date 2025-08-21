
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",   // app ディレクトリ配下も対象
    "./src/**/*.{js,ts,jsx,tsx,mdx}",   // src も使っているなら追加
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "767px"},
      md: { max: "1260px"},
      lg: { max: "1320px"}
    },
    extend: {
      colors: {
       black: colors.neutral,
       linkProduct: "#5e270f",
       linkProductDark: "#EAD0C5",
       skincare: "#84aec6",
       face: "#dbc29c",
       eye: "#a897be",
       rip: "#c69399",
       brush: "#a78373"
      },
      fontSize: {
        body: 'clamp(1rem, 0.954rem + 0.2vw, 1.125rem)', // 16-20px
        display: 'clamp(2.25rem, 1.13rem + 4.78vw, 5.313rem)', // 36-85px
        heading2: 'clamp(0.813rem, 0.561rem + 1.07vw, 1.5rem)', // 13-24px
        heading3: 'clamp(1.25rem, 1.159rem + 0.39vw, 1.5rem)', // 20-24px
        nav: '16px',
        topLinkMenu: 'clamp(1.25rem, 0.536rem + 1.49vw, 1.875rem)', // 20-30px 画面幅 768px - 1440px
        productMenu: 'clamp(1rem, 0.817rem + 0.78vw, 1.5rem)', // 16-24px
        productColumn: 'clamp(0.813rem, 0.698rem + 0.49vw, 1.125rem)', // 13-18px
      },
      fontFamily: {
        serif: ["var(--font-noto-serif-jp)", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
export default config;