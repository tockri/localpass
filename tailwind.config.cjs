/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  content: ['./src/renderer/src/**/*.{vue,ts,tsx}', './.storybook/**/*.{js,ts,jsx,tsx,vue,mdx}'],
  theme: {
    extend: {
      colors: {
        'vuetify-outline': 'var(--v-theme-outline-variant)'
      }
    }
  },
  plugins: []
}

