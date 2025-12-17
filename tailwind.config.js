/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './docs/**/*.{js,jsx,ts,tsx,mdx}',
    './blog/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: { 
    preflight: false,
  },
  darkMode: ['class', '[data-theme="dark"]'], // Syncs with Docusaurus dark mode
};

