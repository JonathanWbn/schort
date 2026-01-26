'use client'

import { useState } from 'react'

export default function Impressum() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<button onClick={() => setOpen(true)} className='text-accent'>
				Impressum
			</button>
			{open && (
				<div
					className='fixed inset-0 bg-black/50 flex items-center justify-center p-4'
					onClick={() => setOpen(false)}
				>
					<div
						className='bg-white rounded-lg p-6 max-w-md'
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className='text-2xl font-bold mb-4 text-accent'>Impressum</h2>
						<p className='text-gray-600 mb-4'>Angaben gemäß § 5 TMG</p>
						<p className='text-gray-700'>Jonathan Wieben</p>
						<p className='text-gray-700'>Alfredstr. 61</p>
						<p className='text-gray-700 mb-4'>20535 Hamburg</p>
						<p className='text-gray-700 font-semibold'>Kontakt:</p>
						<p className='text-gray-700'>E-Mail: jwieben@hey.com</p>
						<button
							onClick={() => setOpen(false)}
							className='mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300'
						>
							Schließen
						</button>
					</div>
				</div>
			)}
		</>
	)
}
