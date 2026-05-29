/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#030014',
          deep: '#070220',
          purple: '#0a0526',
          violet: '#4c1d95',
          neonCyan: '#06b6d4',
          neonPurple: '#a855f7',
          neonPink: '#ec4899',
          stardust: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cosmic: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
        'glow-purple': 'glowPurple 2s ease-in-out infinite alternate',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.2), 0 0 10px rgba(6, 182, 212, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.4)' },
        },
        glowPurple: {
          '0%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.2), 0 0 10px rgba(168, 85, 247, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.6), 0 0 30px rgba(168, 85, 247, 0.4)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(10px, 15px) rotate(180deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        }
      },
      backdropBlur: {
        cosmic: '20px',
      }
    },
  },
  plugins: [],
}
