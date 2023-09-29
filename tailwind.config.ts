import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'onyx' : '#0E0E23',
        'tufts-blue' : '#4255D4',
        'bubbles' : '#e7e8ea',
        'pale' : '#9b9ca7'
      },
      backgroundImage: {
        'radial' : 'radial-gradient(circle, #1a2049 0%, #13162f 100%)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ],
}
export default config
