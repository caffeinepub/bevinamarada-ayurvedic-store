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
        sidebar: {
          DEFAULT: "oklch(var(--sidebar) / <alpha-value>)",
          foreground: "oklch(var(--sidebar-foreground) / <alpha-value>)",
          primary: "oklch(var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground) / <alpha-value>)",
          accent: "oklch(var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "oklch(var(--sidebar-border) / <alpha-value>)",
          ring: "oklch(var(--sidebar-ring) / <alpha-value>)",
        },
        neon: {
          green: "oklch(0.75 0.22 150)",
          cyan: "oklch(0.72 0.18 200)",
          blue: "oklch(0.65 0.22 250)",
        },
        dark: {
          DEFAULT: "oklch(0.09 0.005 250)",
          card: "oklch(0.14 0.008 250)",
          border: "oklch(0.22 0.015 250)",
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'neon-green': '0 0 8px oklch(0.75 0.22 150 / 0.4), 0 0 24px oklch(0.75 0.22 150 / 0.15)',
        'neon-cyan': '0 0 8px oklch(0.72 0.18 200 / 0.4), 0 0 24px oklch(0.72 0.18 200 / 0.15)',
        'neon-blue': '0 0 8px oklch(0.65 0.22 250 / 0.4), 0 0 24px oklch(0.65 0.22 250 / 0.15)',
        'card': '0 1px 4px oklch(0 0 0 / 0.4), 0 2px 8px oklch(0 0 0 / 0.3)',
        'card-hover': '0 0 0 1px oklch(0.75 0.22 150 / 0.25), 0 0 20px oklch(0.75 0.22 150 / 0.1)',
        'modal': '0 20px 60px oklch(0 0 0 / 0.6)',
        'pharma': '0 0 10px oklch(0.75 0.22 150 / 0.3), 0 2px 8px oklch(0.75 0.22 150 / 0.2)',
        'pharma-sm': '0 0 6px oklch(0.75 0.22 150 / 0.2)',
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
        pageEnter: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 6px oklch(0.75 0.22 150 / 0.3)' },
          '50%': { boxShadow: '0 0 14px oklch(0.75 0.22 150 / 0.6), 0 0 28px oklch(0.75 0.22 150 / 0.2)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'float-particle': {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0.4' },
          '33%': { transform: 'translateY(-20px) translateX(10px) scale(1.1)', opacity: '0.6' },
          '66%': { transform: 'translateY(10px) translateX(-8px) scale(0.9)', opacity: '0.3' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'page-enter': 'pageEnter 0.35s ease-out forwards',
        'neon-pulse': 'neon-pulse 2.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float-particle': 'float-particle 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
