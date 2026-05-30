import type { Config } from 'tailwindcss';

/**
 * GolfCarry.Store design system.
 * Palette: clean white + near-black ink, deep "fairway" green as the accent,
 * a warm sand/parchment neutral for premium contrast, and a brass/gold detail.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent — deep golf-course green.
        fairway: {
          50: '#f0f6f1',
          100: '#dcebdd',
          200: '#bcd7be',
          300: '#8fbb93',
          400: '#5e9764',
          500: '#3d7a44',
          600: '#2c6233', // primary brand green
          700: '#244e2b',
          800: '#1f3f25',
          900: '#1b3420',
          950: '#0d1d11',
        },
        // Warm premium neutral.
        sand: {
          50: '#fbf9f4',
          100: '#f5f0e6',
          200: '#eae1cd',
          300: '#dccba9',
          400: '#caaf7d',
          500: '#bd9a5f',
        },
        // Near-black ink.
        ink: {
          DEFAULT: '#14181a',
          soft: '#3a4043',
          muted: '#6b7376',
        },
        brass: '#b08d57',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        card: '0.625rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,24,26,0.04), 0 8px 24px -12px rgba(20,24,26,0.12)',
        'card-hover': '0 2px 4px rgba(20,24,26,0.06), 0 18px 40px -16px rgba(20,24,26,0.22)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
