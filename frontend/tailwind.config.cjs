/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080b14',
        surface: '#0e1220',
        card: '#111827',
        border: '#1e2a3a',
        primary: '#f1f5f9',
        secondary: '#64748b',
        muted: '#1e293b',
        accent: '#6366f1',
        'accent-glow': '#818cf8',
        'accent-dim': '#1e1b4b',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at top left, rgba(99,102,241,0.15) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow-accent': '0 0 30px -5px rgba(99,102,241,0.4)',
        'glow-success': '0 0 30px -5px rgba(16,185,129,0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
