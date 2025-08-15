'use client'

import { useId, useReducer } from 'react'

import { saveRedirect } from './actions'

function reducer(state, action) {
	switch (action.type) {
		case 'SET_SLUG':
			return {
				...state,
				slug: action.payload.replace(/ /g, '').toLowerCase(),
				notification: null,
			}
		case 'SET_URL':
			return { ...state, url: action.payload, notification: null }
		case 'ERROR':
			return {
				...state,
				notification: { message: action.payload, type: 'error' },
				isLoading: false,
			}
		case 'SUCCESS':
			return {
				...state,
				notification: {
					message: action.payload,
					slug: action.slug,
					type: 'success',
				},
				slug: '',
				url: '',
				isLoading: false,
			}
		case 'CLOSE_NOTIFICATION':
			return { ...state, notification: null }
		case 'START_REQUEST':
			return { ...state, isLoading: true }
		default:
			return state
	}
}

export default function Form() {
	const urlId = useId()
	const slugId = useId()
	const [{ slug, url, notification, isLoading }, dispatch] = useReducer(
		reducer,
		{
			slug: '',
			url: '',
			notification: null,
			isLoading: false,
		},
	)

	async function onAction() {
		const isValidSlug = /^[a-z0-9-]+$/.test(slug)
		if (!isValidSlug) {
			dispatch({
				type: 'ERROR',
				payload:
					'Your slug shall only include numerals, letters and/or hyphens.',
			})
			return
		}

		dispatch({ type: 'START_REQUEST' })

		const response = await saveRedirect(slug, url)

		if (response.success) {
			dispatch({
				type: 'SUCCESS',
				payload: 'Successfully created link.',
				slug: response.slug,
			})
		} else {
			dispatch({
				type: 'ERROR',
				payload: response.error || 'Something went wrong. :/',
			})
		}
	}

	return (
		<>
			<form action={onAction} className='mt-10 flex flex-col w-full max-w-sm'>
				<div className='flex mb-0.5 border-b-2 border-accent/50 focus-within:border-accent/100'>
					<label
						htmlFor={urlId}
						className='text-sm sm:text-base text-accent p-3 sm:p-4 w-14'
					>
						URL
					</label>
					<input
						required
						type='URL'
						id={urlId}
						value={url}
						onChange={(e) =>
							dispatch({ type: 'SET_URL', payload: e.target.value })
						}
						autoFocus
						placeholder='The URL you want to shorten.'
						className='text-accent p-3 sm:p-4 text-sm sm:text-base placeholder-accent/40 focus:outline-hidden transition-colors grow'
					/>
				</div>
				<div className='flex mb-5 border-b-2 border-accent/50 focus-within:border-accent/100'>
					<label
						htmlFor={slugId}
						className='text-sm sm:text-base text-accent-light p-3 pr-1 sm:p-4 sm:pr-1'
					>
						https://schort.me/
					</label>
					<input
						required
						value={slug}
						placeholder='e.g. cute-dog-pi'
						id={slugId}
						onChange={(e) =>
							dispatch({ type: 'SET_SLUG', payload: e.target.value })
						}
						className='text-accent p-3 sm:p-4 pl-0 sm:pl-0 text-sm sm:text-base placeholder-accent/40 focus:outline-hidden transition-colors grow'
					/>
				</div>
				<button
					type='submit'
					className='text-base bg-accent text-white transition-colors focus:outline-hidden border-2 rounded-sm border-accent focus:bg-white focus:text-accent hover:bg-white hover:text-accent p-3 sm:p-4 font-bold disabled:cursor-wait'
					disabled={isLoading}
				>
					Create
				</button>
			</form>
			{notification && (
				<div className='relative w-full max-w-sm'>
					<div
						className={[
							'w-full mt-6 absolute p-3 border rounded-sm',
							notification.type === 'error' ? 'border-red-600' : '',
							notification.type === 'success' ? 'border-emerald-600' : '',
						].join(' ')}
					>
						<p
							className={[
								'text-lg',
								notification.type === 'error' ? 'text-red-600' : '',
								notification.type === 'success' ? 'text-emerald-600' : '',
							].join(' ')}
						>
							{notification.message}{' '}
						</p>
						{notification.type === 'success' && (
							<button
								type='button'
								onClick={() =>
									navigator.clipboard.writeText(
										`https://schort.me/${notification.slug}`,
									)
								}
								className='text-white text-sm bg-emerald-600 rounded-sm p-2 w-full mt-4'
							>
								Copy schort.me/{notification.slug}
							</button>
						)}
						<button
							type='button'
							className={[
								'absolute top-1 right-2 text-md leading-none',
								notification.type === 'error' ? 'text-red-600' : '',
								notification.type === 'success' ? 'text-emerald-600' : '',
							].join(' ')}
							onClick={() => dispatch({ type: 'CLOSE_NOTIFICATION' })}
						>
							x
						</button>
					</div>
				</div>
			)}
		</>
	)
}
