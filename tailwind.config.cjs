/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{svelte,html,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['montserrat', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};
