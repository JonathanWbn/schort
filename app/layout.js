import './globals.css'

import { PT_Sans_Caption } from 'next/font/google'

const caption = PT_Sans_Caption({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
	title: 'schort',
	description: 'The last URL shortener you will ever need.',
	author: 'Jonathan Wieben',
	keywords: 'schort url shortener link',
}

export const viewport = {
	initialScale: 1,
	width: 'device-width',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={caption.className}>
			<body className='bg-white'>{children}</body>
		</html>
	)
}
