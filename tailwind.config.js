/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'darkVariantOne': '#1D1D1D',
        'darkVariantTwo': '#2F2F2F',
        'darkVariantThree': '#262626',
        'whiteVariant': '#FFFFFF',
        'whiteVariantOne': '#F8F8F8',
        'highlight': '#807B0F',
      }
    },
  },
  plugins: [],
}
