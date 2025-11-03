/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        agent: {
          alex: '#10b981', // green - Sales
          riley: '#f59e0b', // amber - Marketing
          morgan: '#3b82f6', // blue - Finance
          jordan: '#8b5cf6', // violet - Operations
          sam: '#ec4899', // pink - HR
          taylor: '#14b8a6', // teal - R&D
          casey: '#f97316', // orange - Customer Success
        }
      }
    },
  },
  plugins: [],
}