/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './examples/**/*.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0058FB',
          primaryDark: '#0046C9',
          primaryLight: '#3A7BFC',
        },
        surface: {
          base: '#0B0E17',
          elevated: '#111827',
          overlay: '#1F2937',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        accent: {
          profit: '#059669',
          warning: '#D97706',
          loss: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
      },
      borderRadius: {
        card: '16px',
        button: '12px',
        badge: '8px',
      },
      spacing: {
        // Asset canvas sizes (for previewing components at real export dimensions)
        'asset-sq': '1080px',
        'asset-portrait-h': '1350px',
        'asset-story-h': '1920px',
        'asset-thumb-w': '1280px',
        'asset-thumb-h': '720px',
      },
      letterSpacing: {
        'display-tight': '-0.03em',
        'display': '-0.02em',
      },
    },
  },
  plugins: [],
};
