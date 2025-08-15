module.exports = {
	purge: ['./app/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media', // 'media' or 'class'
	theme: {
		extend: {
			colors: {
				accent: '#f26e03',
				'accent-light': '#fdb57c',
			},
		},
	},
	variants: {
		extend: {
			cursor: ['disabled'],
		},
	},
	plugins: [],
}
