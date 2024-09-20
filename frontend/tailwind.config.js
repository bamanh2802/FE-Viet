import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./layouts/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
  darkMode: ["class", 'class'],
  theme: {
  	extend: {
  		
  	}
  },
	plugins: [nextui(),
		require('tailwind-scrollbar-hide'),
		  require("tailwindcss-animate")
	],
  }
  