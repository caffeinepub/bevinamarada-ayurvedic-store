/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        success: 'oklch(var(--success) / <alpha-value>)',
        warning: 'oklch(var(--warning) / <alpha-value>)',
        info: 'oklch(var(--info) / <alpha-value>)',
        // Vibrant palette
        saffron: {
          DEFAULT: 'oklch(0.65 0.22 40 / <alpha-value>)',
          light: 'oklch(0.92 0.08 55 / <alpha-value>)',
        },
        teal: {
          DEFAULT: 'oklch(0.58 0.18 195 / <alpha-value>)',
          light: 'oklch(0.92 0.06 195 / <alpha-value>)',
        },
        coral: {
          DEFAULT: 'oklch(0.65 0.2 25 / <alpha-value>)',
          light: 'oklch(0.93 0.06 25 / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'oklch(0.75 0.18 75 / <alpha-value>)',
          light: 'oklch(0.95 0.06 75 / <alpha-value>)',
        },
        violet: {
          DEFAULT: 'oklch(0.55 0.2 290 / <alpha-value>)',
          light: 'oklch(0.93 0.06 290 / <alpha-value>)',
        },
        // Forest/sage palette for public layout
        forest: {
          50: 'oklch(0.97 0.02 145)',
          100: 'oklch(0.93 0.04 145)',
          200: 'oklch(0.86 0.07 145)',
          300: 'oklch(0.76 0.1 145)',
          400: 'oklch(0.65 0.14 145)',
          500: 'oklch(0.55 0.17 145)',
          600: 'oklch(0.46 0.17 145)',
          700: 'oklch(0.38 0.15 145)',
          800: 'oklch(0.3 0.12 145)',
          900: 'oklch(0.22 0.09 145)',
        },
        sage: {
          50: 'oklch(0.97 0.02 160)',
          100: 'oklch(0.93 0.04 160)',
          200: 'oklch(0.86 0.06 160)',
          300: 'oklch(0.76 0.09 160)',
          400: 'oklch(0.65 0.12 160)',
          500: 'oklch(0.55 0.14 160)',
          600: 'oklch(0.46 0.14 160)',
          700: 'oklch(0.38 0.12 160)',
          800: 'oklch(0.3 0.1 160)',
          900: 'oklch(0.22 0.08 160)',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 16px)',
      },
      boxShadow: {
        card: '0 2px 12px oklch(0.18 0.02 260 / 0.08)',
        'card-hover': '0 8px 24px oklch(0.18 0.02 260 / 0.14)',
        saffron: '0 4px 16px oklch(0.65 0.22 40 / 0.3)',
        teal: '0 4px 16px oklch(0.58 0.18 195 / 0.3)',
        coral: '0 4px 16px oklch(0.65 0.2 25 / 0.3)',
        gold: '0 4px 16px oklch(0.75 0.18 75 / 0.3)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
