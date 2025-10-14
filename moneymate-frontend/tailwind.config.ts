import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': 'var(--color-primary-green)',
        'accent-green': 'var(--color-accent-green)',
        'background-dark': 'var(--color-background-dark)',
      },
    },
  },
  plugins: [],
}
export default config
