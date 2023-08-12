/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,svg}'],
  theme: {
    extend: {
      colors: {
        // TODO: (aidar.a - 24.06.23) Переписать старые стили на новые
        'main-white': '#ffffff',
        'main-gray': '#F0F1F5',
        'main-black-inactive': '#1e1e1e99',

        'main-stroke': '#1e1e1e1f',
        'accent-fuchsia': '#D409A7',
        'accent-purple': '#783FED',
        'accent-ochra': '#CC9300',
        'accent-aqua': '#13B79A',
        'accent-ametist': '#8A03DC',
        'accent-apple': '#C8205C',
        'accent-orange': '#D75A00',
        'accent-green': '#8EC95B',

        'btn-default': '#9DECF9',
        'btn-onHover': '#51DFF8',

        link: '#63B3ED',

        // Background colors
        platform: '#1A202C',
        card: '#2D3748',

        // Text colors
        input: '#72767D',
        light: '#BDBEC1',

        'system-inactive': '#E8EAED',
        'system-error': '#DB5441',
        'system-danger': '#E28835',
        'system-success': '#35CF73',

        white: '#EBF8FF',
      },
      fontFamily: {
        onest: ['Onest', 'sans-serif'],
      },
      border: {},
      fontSize: {
        '8xl': ['80px', '92px'],
        h1: [
          '60px',
          {
            lineHeight: '72px',
            fontWeight: '700',
          },
        ],
        h2: [
          '40px',
          {
            lineHeight: '48px',
            fontWeight: '500',
          },
        ],
        h3: [
          '24px',
          {
            lineHeight: '36px',
            fontWeight: '500',
          },
        ],
        subh: [
          '32px',
          {
            lineHeight: '40px',
            fontWeight: '500',
          },
        ],
        body: ['18px', '26px'],
        text: ['16px', '24px'],
        footer: ['16px', '24px'],
        caption: [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '500',
          },
        ],
      },
      spacing: {
        15: '60px', // 15 * 4 = 60, т.к. Tailwind использует 4px scale
        10: '40px', // 10 * 4 = 40
        8: '32px', // 8 * 4 = 32
        6: '24px', // 6 * 4 = 24
        4: '16px', // 4 * 4 = 16
        3: '12px', // 3 * 4 = 12
      },
      borderRadius: {
        'card-image': '8px',
        'card-lg': '12px',
        'card-sm': '8px',
        input: '8px',
        small: '8px',
        medium: '10px',
        tag: '6px',
        tab: '80px',
      },
      maxWidth: {
        'screen-2xl': '1440px',
        modal: '792px',
      },
      height: {
        card: '352px',
      },
    },
  },

  plugins: [],
};
