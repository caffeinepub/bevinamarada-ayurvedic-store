/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        success: "oklch(var(--success) / <alpha-value>)",
        warning: "oklch(var(--warning) / <alpha-value>)",
        // Pharma/Ayurvedic theme colors
        forest: {
          DEFAULT: "oklch(0.32 0.10 155)",
          light: "oklch(0.42 0.12 155)",
          dark: "oklch(0.22 0.08 155)",
        },
        sage: {
          DEFAULT: "oklch(0.65 0.10 145)",
          light: "oklch(0.88 0.06 140)",
          dark: "oklch(0.45 0.10 145)",
        },
        gold: {
          DEFAULT: "oklch(0.75 0.16 80)",
          light: "oklch(0.88 0.12 85)",
          dark: "oklch(0.60 0.18 75)",
        },
        cream: {
          DEFAULT: "oklch(0.97 0.02 90)",
          dark: "oklch(0.92 0.04 90)",
        },
        // Neon dark theme colors
        "neon-black": "oklch(0.08 0.01 150)",
        "neon-surface": "oklch(0.12 0.02 150)",
        "neon-surface-2": "oklch(0.16 0.025 150)",
        "neon-green": "oklch(0.75 0.25 145)",
        "neon-dim": "oklch(0.55 0.15 145)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card': '0 2px 8px oklch(0.15 0.02 150 / 0.08)',
        'card-hover': '0 8px 24px oklch(0.15 0.02 150 / 0.15)',
        'pharma': '0 4px 16px oklch(0.42 0.12 155 / 0.15)',
        'pharma-sm': '0 2px 8px oklch(0.42 0.12 155 / 0.12)',
        'modal': '0 20px 60px oklch(0.15 0.02 150 / 0.25)',
        'gold': '0 4px 16px oklch(0.75 0.16 80 / 0.25)',
        // Neon glow shadows
        'neon-sm': '0 0 5px oklch(0.75 0.25 145 / 0.5)',
        'neon': '0 0 10px oklch(0.75 0.25 145), 0 0 20px oklch(0.75 0.25 145 / 0.5)',
        'neon-lg': '0 0 20px oklch(0.75 0.25 145), 0 0 40px oklch(0.75 0.25 145 / 0.5), 0 0 60px oklch(0.75 0.25 145 / 0.3)',
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
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px oklch(0.75 0.25 145 / 0.5)' },
          '50%': { boxShadow: '0 0 20px oklch(0.75 0.25 145), 0 0 40px oklch(0.75 0.25 145 / 0.5)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
