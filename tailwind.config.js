/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f4',
          100: '#e1f2e6',
          200: '#c3e5ce',
          300: '#94d1a9',
          400: '#5fb57d',
          500: '#38995a',
          600: '#2a7c46',
          700: '#236239',
          800: '#1e4e30',
          900: '#1a4129',
          950: '#0c2315',
        },
        earth: {
          50: '#fbf7f4',
          100: '#f5eee6',
          200: '#ebdccf',
          300: '#dbc3b0',
          400: '#c6a48d',
          500: '#b1866f',
          600: '#9b6e59',
          700: '#7c5443',
          800: '#644437',
          900: '#52382e',
          950: '#2c1c16',
        },
        sand: {
          50: '#fdfcf9',
          100: '#f8f6f0',
          200: '#f2efe4',
          300: '#e7e2d2',
          400: '#d7d0bc',
          500: '#c2b8a0',
        },
        harvest: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
        charcoal: {
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0a0f1d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'lift': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
