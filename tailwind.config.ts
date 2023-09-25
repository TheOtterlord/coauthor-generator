import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        'primary': {
          '50': '#f1fcf5',
          '100': '#defaea',
          '200': '#bef4d5',
          '300': '#8beab6',
          '400': '#52d68d',
          '500': '#33d17a',
          '600': '#1d9c56',
          '700': '#1b7a46',
          '800': '#1a613b',
          '900': '#175033',
          '950': '#072c19',
        },
        error: colors.red
      }
    },
	},
	plugins: [],
}
