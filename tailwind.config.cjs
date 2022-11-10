const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			width: {
				"160": "40rem"
			}
		} 
	},

	plugins: [
		require('@tailwindcss/forms'), 
		require('@brainandbones/skeleton/tailwind/theme.cjs'),
	],

	darkMode: 'class'
};

module.exports = config;
