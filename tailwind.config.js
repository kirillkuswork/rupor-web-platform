/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/rupor-ui-kit/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'current': 'currentColor',
        'positive': '#35D64D',
        'negative': '#F23B3B',
        'grey': '#73767C',
        'grey-dark': '#80838C',
        'shark': '#1A1B1E',
        'shuttle-gray': '#676970',
        'mid-gray': '#63656B',
        'white': '#FFFFFF',
        'white-smoky': '#F5F7FA',
        'white-deep': '#DCDDE3',
        'grey-blue-light': '#F1F3F8',
        'grey-light': '#828386',
        'grey-silver': '#80838C',
        'grey-darkened': '#3D3F45',
        'grey-darkened-light': '#414349',
        'grey-deep': '#37383B',
        'colorGrey': '#2F3136',
        'black-old': '#212226',
        'black': '#0A0A0A',
        'black-full': '#000000',
        'charcoal': '#3A3C42',
        'charcoal-dark': '#3C3F44',
        'red': '#F2004C',
        'red-alert': '#F23B3B',
        'white-transparent': '#252628',
        'white-40': '#999',
        'light-background': '#E2E5ED',
        'light-background-focus': '#DEE1EA',
        'light-text-secondary': '#A2A5AB',
        'white-grey': '#E0E4EC',

        /* Цвет состояний */
        'primary-def': '#F2004C',
        'primary-success': '#28CD41',
        'primary-hov': '#FF334D',

        'secondary-dark-def': '#27282D',
        'secondary-light-def': '#E7EAF2',
        'secondary-light-hov': '#DBE0EC',

        'tertiary': '#17181B',
        'outlined-hov': '#57595F',
      },
      fontSize: {
        'paragraph-xs': ['8px', { lineHeight: '14px' }],
        'paragraph-s': ['10px', { lineHeight: '15px' }],
        'paragraph-m-s': ['12px', { lineHeight: '25px' }],
        'paragraph-l-m': ['14px', { lineHeight: '22px' }],
        'paragraph-m-l': ['14px', { lineHeight: '26px' }],
        'paragraph-l': ['16px', { lineHeight: '28px' }],
        'paragraph-xl': ['18px', { lineHeight: '29px' }],
        'headline-xs': ['20px', { lineHeight: '31px' }],
        'headline-s': ['24px', { lineHeight: '33px' }],
        'headline-m-s': ['28px', { lineHeight: '36px' }],
        'headline-l-m': ['32px', { lineHeight: '47px' }],
        'headline-l': ['36px', { lineHeight: '50px' }],
        'headline-xl': ['40px', { lineHeight: '53px' }],
        'accent-s': ['48px', { lineHeight: '67px' }],
        'accent-m-s': ['56px', { lineHeight: '73px' }],
        'accent-l-m': ['64px', { lineHeight: '79px' }],
        'accent-l': ['72px', { lineHeight: '80px' }],
      },
      borderRadius: {
        'none': '0',
        DEFAULT: '8px',
        'md': '4px',
        'lg': '8px',
        'xl': '12px',
        'full': '9999px',
      },
      screens: {
        'md': { 'max': '1024px' },
        'md-kids': { 'max': '1024px'}, // TODO:: переименовать при выносе в отдельный конфиг
        'sm-kids': { 'max': '744px' }, // TODO:: переименовать при выносе в отдельный конфиг
        'xs-kids': { 'max': '390px'},  // TODO:: переименовать при выносе в отдельный конфиг
        // => @media (max-width: 1280px) { ... }
        'h-xs': { 'raw': '(max-height: 400px)' },
        'sm': { 'max': "640px" },
        // => @media (max-width: 640px) { ... }

      },
      zIndex: {
        'overlay': '60',
        'popup': '70',
        'modal-overlay': '75',
        'modal': '80',
        'notify': '100',
      },
      spacing: {
        '0.75': '0.19rem', /* 3px */
        '4.5': '1.125rem', /* 18px */
        '13': '3.25rem', /* 52px */
        '18': '4.5rem', /* 72px */
        '25': '6.25rem', /* 100px */
        '60': '15rem', /* 240px */
        'header-height': '72px',
        'header-height-mobile': '64px',
        'navbar-thin-width': '72px',
        'navbar-width': '240px',
        'navbar-mobile-width': '260px',
        'main-layout': '180px',
      },
      rotate: {
        '50': '50deg',
      },
      opacity: {
        '2.5': '0.025'
      },
      backgroundImage: {
        'check-mark': `url("data:image/svg+xml,%3Csvg width='13' height='9' viewBox='0 0 13 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.83331 7.75L5.54042 8.45711C5.1499 8.84763 4.51673 8.84763 4.12621 8.45711L4.83331 7.75ZM4.12621 8.45711L0.626206 4.95711L2.04042 3.54289L5.54042 7.04289L4.12621 8.45711ZM12.5404 1.45711L5.54042 8.45711L4.12621 7.04289L11.1262 0.0428934L12.5404 1.45711Z' fill='white'/%3E%3C/svg%3E%0A")`,
        'check-mark-disabled': `url("data:image/svg+xml,%3Csvg width='13' height='9' viewBox='0 0 13 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.83331 7.75L5.54042 8.45711C5.1499 8.84763 4.51673 8.84763 4.12621 8.45711L4.83331 7.75ZM4.12621 8.45711L0.626206 4.95711L2.04042 3.54289L5.54042 7.04289L4.12621 8.45711ZM12.5404 1.45711L5.54042 8.45711L4.12621 7.04289L11.1262 0.0428934L12.5404 1.45711Z' fill='white' fill-opacity='0.4'/%3E%3C/svg%3E%0A")`,
        'radio-mark': `radial-gradient(circle closest-side, currentColor 34%, transparent 36%)`
      },
      keyframes: {
        "ripples": {
          '0%': { transform: 'scale(1)', opacity: '0.2' },
          '100%': { transform: 'scale(10)', opacity: '0' },
        },
        "absolute-spin": {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        "fade-in": {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        "ripples": 'ripples 300ms ease-out forwards',
        "absolute-spin": 'absolute-spin 1s linear infinite',
        "fade-in": 'fade-in 300ms ease-out forwards',
      }
    }
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    ({ matchUtilities, theme }) => {
      matchUtilities(
          {
            'aspect': (value) => ({
              '@supports (aspect-ratio: 1 / 1)': {
                aspectRatio: value,
              },
              '@supports not (aspect-ratio: 1 / 1)': {
                '&::before': {
                  content: '""',
                  float: 'left',
                  paddingTop: `calc(100% / (${value}))`,
                },
                '&::after': {
                  clear: 'left',
                  content: '""',
                  display: 'block',
                }
              },
            }),
          },
          { values: theme('aspectRatio') }
      )
    },
  ],
  mode: 'jit',
}
