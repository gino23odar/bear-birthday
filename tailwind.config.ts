// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D9A8FF",
        "primary-dark": "#B580FF",
        accent: "#FFB4A2",
        deep: "#1E293B",
        countryside: "#BCEBCB",
        "bg-top": "#F6F7FB",
        "bg-bottom": "#FFF7F8",
      },
      backgroundImage: {
        "main-gradient": "linear-gradient(180deg, #F6F7FB 0%, #FFF7F8 100%)",
        "hero-gradient":
          "radial-gradient(1200px 500px at 10% 10%, rgba(217,168,255,0.12), transparent 12%), radial-gradient(900px 400px at 90% 90%, rgba(255,180,162,0.08), transparent 12%), linear-gradient(180deg, #F6F7FB, #FFF7F8)",
      },
      borderRadius: {
        xl: "8px",
        "2xl": "12px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Poppins",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        flutter: "flutter 3.2s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        flutter: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(8px)" },
          "75%": { transform: "translateX(-8px)" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
