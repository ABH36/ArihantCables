/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Polycab/Arihant orange — exact match to the live site's --theme-color
        primary: {
          50:  "#fff3ec",
          100: "#ffe2cf",
          200: "#ffc199",
          300: "#ff9c5c",
          400: "#fd8222",
          500: "#fc6601", // Main brand orange (matches arihantcables.com --theme-color)
          600: "#dc5a00",
          700: "#b64a00",
          800: "#8f3a00",
          900: "#742f00",
          950: "#3f1900",
        },
        // Near-black — matches the live site's --tertiary-color (header/footer surfaces)
        navy: {
          50:  "#f2f2f2",
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#999999",
          400: "#666666", // matches --body-color
          500: "#404040",
          600: "#2b2b2b",
          700: "#1e1e1e",
          800: "#181818",
          900: "#141414", // Main near-black (matches --tertiary-color)
          950: "#000000", // matches --title-color (headings)
        },
        // Amber — CTAs / highlights
        accent: {
          DEFAULT: "#F5A623",
          light: "#FBBF24",
          dark: "#D97706",
        },
      },
      fontFamily: {
        // Matches arihantcables.com exactly: headings use Rubik, body text uses Epilogue.
        sans: ["var(--font-epilogue)", "system-ui", "sans-serif"],
        heading: ["var(--font-rubik)", "var(--font-epilogue)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "card": "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.16)",
        "cta": "0 4px 24px rgba(212,65,11,0.3)",
      },
      backgroundImage: {
        "section-gradient": "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        marquee: "marquee 28s linear infinite",
        "logo-pulse": "logoPulse 1.8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        logoPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.08)", opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
