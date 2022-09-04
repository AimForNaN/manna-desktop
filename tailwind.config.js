/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				archivo: 'Archivo Narrow',
				beba: 'Bebas Neue',
				'big-shoulders': 'Big Shoulders Text',
				inter: 'Inter',
				mallanna: 'Mallanna',
				mate: 'Mate',
				muli: 'Mulish',
				oswald: 'Oswald',
				pathway: 'Pathway Gothic One',
				poppins: 'Poppins',
				roboto: 'Roboto',
				'roboto-condensed': 'Roboto Condensed',
				source: 'Source Sans Pro',
				yant: 'Yantramanav',
			},
		},
	},
	plugins: [],
};
