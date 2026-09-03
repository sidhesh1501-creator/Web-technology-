/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['attribute', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        navy: {
          50: '#f0f4ff',
          100: '#dce8ff',
          200: '#bad0ff',
          300: '#84acff',
          400: '#4d81fb',
          500: '#2558f7',
          600: '#1441ed',
          700: '#122fda',
          800: '#1428b1',
          900: '#16278b',
          950: '#0f1a55',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'count-up': 'countUp 1s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
        'card': '0 4px 24px rgba(99, 102, 241, 0.1)',
        'hover': '0 8px 40px rgba(99, 102, 241, 0.2)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 40%, #4338ca 70%, #6366f1 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))',
        'dark-gradient': 'linear-gradient(135deg, #0f1a55 0%, #1e1b4b 100%)',
      }
    },
  },
  plugins: [],
}
