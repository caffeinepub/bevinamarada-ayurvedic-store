/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "oklch(0.45 0.15 195)",
          foreground: "oklch(0.98 0.005 200)",
          light: "oklch(0.92 0.05 195)",
          dark: "oklch(0.35 0.15 195)",
        },
        secondary: {
          DEFAULT: "oklch(0.92 0.03 195)",
          foreground: "oklch(0.25 0.05 195)",
        },
        muted: {
          DEFAULT: "oklch(0.94 0.01 200)",
          foreground: "oklch(0.5 0.03 200)",
        },
        accent: {
          DEFAULT: "oklch(0.88 0.06 160)",
          foreground: "oklch(0.2 0.08 160)",
        },
        destructive: {
          DEFAULT: "oklch(0.55 0.2 25)",
          foreground: "oklch(0.98 0.005 25)",
        },
        card: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.15 0.02 220)",
        },
        popover: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.15 0.02 220)",
        },
        pharma: {
          teal: "oklch(0.45 0.15 195)",
          "teal-light": "oklch(0.92 0.05 195)",
          "teal-dark": "oklch(0.35 0.15 195)",
          green: "oklch(0.5 0.15 155)",
          "green-light": "oklch(0.92 0.05 155)",
          blue: "oklch(0.5 0.15 230)",
          "blue-light": "oklch(0.92 0.05 230)",
          gray: "oklch(0.94 0.01 200)",
          "gray-dark": "oklch(0.5 0.03 200)",
          white: "oklch(1 0 0)",
          "off-white": "oklch(0.98 0.005 200)",
        },
        success: {
          DEFAULT: "oklch(0.55 0.15 155)",
          foreground: "oklch(0.98 0.005 155)",
        },
        warning: {
          DEFAULT: "oklch(0.75 0.15 75)",
          foreground: "oklch(0.2 0.05 75)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px 0 rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        modal: "0 20px 60px -10px rgba(0,0,0,0.2)",
        "pharma-sm": "0 1px 4px rgba(0, 120, 130, 0.1)",
        pharma: "0 4px 16px rgba(0, 120, 130, 0.15)",
        "pharma-lg": "0 8px 32px rgba(0, 120, 130, 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
