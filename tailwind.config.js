/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    "./*.html",
    "./js/**/*.js",
  ],
  // Safelist mantenuta, ma ridotta se possibile tramite logica dinamica nei template
  safelist: [
    'from-brand', 'to-brand-dark', // Esempio di utilizzo classi semantiche
    { pattern: /from-(brand|info|success|warning)/ }, // Pattern matching è più potente
    'hidden', 'lg:block', 'lg:hidden', 'lg:flex',
  ],
  theme: {
    extend: {
      // 1. PALETTE PRIMITIVA (I "pastelli" e i colori brand)
      colors: {
        // Scala di Grigi stile iOS (San Francisco)
        // Utile per: bg-ios-100 (light) -> bg-ios-900 (dark bg)
        ios: {
          50: '#F5F5F7',  // Light Background
          100: '#E5E5EA',
          200: '#D1D1D6',
          300: '#C7C7CC',
          400: '#8E8E93', // Muted text
          500: '#636366',
          600: '#48484A', // Border Dark
          700: '#3A3A3C', // Elevated Dark
          800: '#2C2C2E', // Card Dark
          900: '#1C1C1E', // Main Dark BG
          950: '#000000', // Pure Black
        },
        // Brand Ipermela
        brand: {
          50: '#FFF5E5',
          100: '#FFD199', // Light / Hover
          200: '#FFBD7A', // Dark Mode Text
          DEFAULT: '#FF9900', // Main Brand
          500: '#FF9900',
          600: '#E67300', // Text Dark / Active
          700: '#CC6600',
          800: '#994D00',
          900: '#663300',
        },
        // Colori Pastello (Primitivi)
        pastel: {
          blue: '#66AFFF',
          red: '#FFB3AD',
          green: '#90E0A8',
          orange: '#FFD17A',
          purple: '#D4A5FF',
        }
      },
      // 2. PALETTE SEMANTICA (Il significato dei colori)
      // Qui mappiamo i primitivi all'uso reale
      textColor: {
        skin: {
          base: '#1C1C1E',          // Testo base Light mode
          inverted: '#F5F5F7',      // Testo base Dark mode
          muted: '#86868B',         // Testo secondario
          'brand-accessible': '#E67300', // Per testo su sfondo chiaro
        }
      },
      backgroundColor: {
        skin: {
          fill: '#FFFFFF',          // Sfondo pagina Light
          'fill-dark': '#1C1C1E',   // Sfondo pagina Dark (ios-900)
          card: '#F5F5F7',          // Card Light
          'card-dark': '#2C2C2E',   // Card Dark (ios-800)
          elevated: '#FFFFFF',      // Dropdown/Modal Light
          'elevated-dark': '#3A3A3C', // Dropdown/Modal Dark (ios-700)
        }
      },
      borderColor: {
        skin: {
          DEFAULT: '#E5E5EA',
          dark: '#48484A',
        }
      },
      // Ridefinizione funzionale (Success, Info, etc.)
      // Nota: Non usiamo oggetti annidati complessi per evitare confusione nelle classi
      success: {
        DEFAULT: '#5BC77A', // Vivido
        soft: '#90E0A8',    // Pastello
        text: '#1F6F35',    // Leggibile (WCAG)
      },
      info: {
        DEFAULT: '#21A4F6', // Brand Catalog Blue
        soft: '#66AFFF',
        text: '#0066E6',
      },
      warning: {
        DEFAULT: '#FF9900',
        soft: '#FFD17A',
        text: '#674918',
      },
      danger: {
        DEFAULT: '#FF3B30', // Rosso Apple Standard
        soft: '#FFB3AD',
        text: '#882C25',
      },
      
      // Animazioni (Mantenute, erano ottime)
      animation: {
        'slide-in': 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)', // "Apple-like" spring physics
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }, // Ridotto per essere più "Apple"
        },
      }
    }
  },
  plugins: [],
}