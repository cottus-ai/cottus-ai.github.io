/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#ffffff',
          surface: '#fafafa',
          elevated: '#f4f4f5',
        },
        accent: {
          DEFAULT: '#84cc16',
          dim: '#65a30d',
          faint: '#d9f99d',
        },
        border: {
          subtle: '#e4e4e7',
          DEFAULT: '#d4d4d8',
          visible: '#a1a1aa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
}
