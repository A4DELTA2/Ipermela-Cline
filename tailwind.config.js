/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Abilita dark mode con classe .dark
  content: [
    "./*.html",
    "./js/**/*.js",
    "./js/**/**/*.js",
  ],
  safelist: [
    'from-[#FF9900]',
    'to-[#FF7700]',
    'to-[#FFAC33]',
    'dark:from-[#FF9900]',
    'dark:to-[#FFAC33]',
    'hidden',
    'lg:block',
    'lg:hidden',
    'lg:flex',
  ],
  theme: {
    extend: {
      colors: {
        // Colori Brand Ipermela - Palette Pastello
        brand: {
          DEFAULT: '#FF9900',    // Arancione pastello principale (light mode)
          light: '#FFD199',      // Arancione chiaro per hover
          dark: '#E67300',       // Arancione scuro per testo/stati attivi (WCAG AA)
          darkmode: '#FFBD7A',   // Arancione pastello (DARK MODE)
          'gradient-end': '#FF7700',     // Arancione scuro per gradienti
          'gradient-end-dark': '#FFAC33', // Arancione chiaro per gradienti dark mode
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
          darkred: '#882C25',   // Rosso scuro per testo (WCAG AA)
          green: '#90E0A8',     // Verde pastello (sfondo)
          darkgreen: '#1F6F35', // Verde scuro per testo (WCAG AA)
          orange: '#FFD17A',    // Giallo pesca pastello (sfondo)
          darkorange: '#674918', // Arancione scuro per testo (WCAG AA)
          purple: '#D4A5FF',    // Viola pastello
          darkpurple: '#4A2470', // Viola scuro
        },
        // Colori Semantici (controllo centralizzato con Dark Mode)
        success: {
          light: '#90E0A8',      // Verde pastello
          DEFAULT: '#5BC77A',    // Verde brillante (LIGHT MODE)
          dark: '#5BC77A',       // Verde brillante (DARK MODE)
        },
        info: {
          light: '#66AFFF',      // Azzurro pastello
          DEFAULT: '#5AAFFF',    // Blu brillante (LIGHT MODE)
          dark: '#5AAFFF',       // Blu brillante (DARK MODE)
        },
        warning: {
          light: '#FF9900',      // Arancione pastello (DARK MODE)
          DEFAULT: '#FF9900',      // Arancione pastello (DARK MODE)
          dark: '#FF9900',      // Arancione pastello (DARK MODE)
        },
        danger: {
          light: '#FFB3AD',      // Rosa pesca
          DEFAULT: '#FF8A80',    // Rosso brillante (LIGHT MODE)
          dark: '#FF8A80',       // Rosso brillante (DARK MODE)
        },
        // Colore Bottoni Catalogo Prodotti
        catalog: {
          DEFAULT: '#21A4F6',    // Blu catalogo (light mode)
          dark: '#5AB9FF',       // Blu più chiaro (dark mode)
        },
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
