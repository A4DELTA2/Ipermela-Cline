/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Colori Brand Ipermela - Palette Pastello
        brand: {
          DEFAULT: '#FFB366', // Arancione pastello principale
          light: '#FFD199',   // Arancione chiaro per hover
          dark: '#E67300',    // Arancione scuro per testo/stati attivi (WCAG AA)
        },
        // Palette Sfondi (Soft Black - Apple Style)
        dark: {
          bg: '#1C1C1E',      // Sfondo principale
          card: '#2C2C2E',    // Schede prodotti / Container
          elevated: '#3A3A3C', // Modali / Dropdown / Navbar
          border: '#48484A',   // Bordi sottili
          text: '#F5F5F7',     // Testo principale (bianco sporco)
          muted: '#86868B',    // Testo secondario
        },
        // Colori Funzionali - Palette Pastello
        apple: {
          blue: '#66AFFF',      // Azzurro pastello (sfondo/badge)
          darkblue: '#0066E6',  // Blu scuro per testo/link (WCAG AA)
          red: '#FFB3AD',       // Rosa pesca pastello (sfondo)
          darkred: '#E63B30',   // Rosso scuro per testo (WCAG AA)
          green: '#90E0A8',     // Verde pastello (sfondo)
          darkgreen: '#2FA84F', // Verde scuro per testo (WCAG AA)
          orange: '#FFD17A',    // Giallo pesca pastello (sfondo)
          darkorange: '#E68F00', // Arancione scuro per testo (WCAG AA)
          purple: '#D4A5FF',    // Viola pastello
          darkpurple: '#9B5FD9', // Viola scuro
        }
      },
      animation: {
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    }
  },
  plugins: [],
}
