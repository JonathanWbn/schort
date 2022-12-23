'use client'

import classnames from 'classnames'
import { useReducer } from 'react'

import { formatSlug } from '../utils'

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SLUG':
      return { ...state, slug: action.payload, notification: null }
    case 'SET_URL':
      return { ...state, url: action.payload, notification: null }
    case 'ERROR':
      return { ...state, notification: { message: action.payload, type: 'error' }, isLoading: false }
    case 'SUCCESS':
      return {
        ...state,
        notification: { message: action.payload, slug: action.slug, type: 'success' },
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
  const [{ slug, url, notification, isLoading }, dispatch] = useReducer(reducer, {
    slug: '',
    url: '',
    notification: null,
    isLoading: false,
  })

  async function onSubmit(e) {
    e.preventDefault()

    try {
      const isValidSlug = /^[a-z0-9-]+$/.test(slug)
      if (!isValidSlug) {
        dispatch({ type: 'ERROR', payload: 'Your slug shall only include numerals, letters and/or hyphens.' })
        return
      }

      dispatch({ type: 'START_REQUEST' })

      const response = await fetch('/api/redirect', {
        method: 'POST',
        body: JSON.stringify({ slug, url }),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => (res.ok ? res.json() : res.text().then((text) => Promise.reject(text))))

      dispatch({ type: 'SUCCESS', payload: 'Successfully created link.', slug: response.slug })
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error || 'Something went wrong. :/' })
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mt-10 flex flex-col w-full max-w-sm">
        <div className="flex mb-0.5 border-b-2 border-accent border-opacity-50 focus-within:border-opacity-100">
          <label htmlFor="url" className="text-sm sm:text-base text-accent p-3 sm:p-4 w-14">
            URL
          </label>
          <input
            required
            type="URL"
            id="url"
            value={url}
            onChange={(e) => dispatch({ type: 'SET_URL', payload: e.target.value })}
            autoFocus
            placeholder="The URL you want to shorten."
            className="text-accent p-3 sm:p-4 text-sm sm:text-base placeholder-accent placeholder-opacity-40 focus:outline-none transition-colors flex-grow"
          />
        </div>
        <div className="flex mb-5 border-b-2 border-accent border-opacity-50 focus-within:border-opacity-100">
          <label htmlFor="slug" className="text-sm sm:text-base text-accent p-3 sm:p-4 w-14">
            Slug
          </label>
          <input
            required
            value={slug}
            placeholder="e.g. join-call"
            id="slug"
            onChange={(e) => dispatch({ type: 'SET_SLUG', payload: formatSlug(e.target.value) })}
            className="text-accent p-3 sm:p-4 text-sm sm:text-base placeholder-accent placeholder-opacity-40 focus:outline-none transition-colors flex-grow"
          />
        </div>
        <button
          className="text-base bg-accent text-white transition-colors focus:outline-none border-2 rounded border-accent focus:bg-white focus:text-accent hover:bg-white hover:text-accent p-3 sm:p-4 font-bold disabled:cursor-wait"
          disabled={isLoading}
        >
          Create
        </button>
      </form>
      {notification && (
        <div className="relative w-full max-w-sm">
          <div
            className={classnames(
              'w-full mt-6 absolute p-3 border rounded',
              notification.type === 'error' && 'border-red-600',
              notification.type === 'success' && 'border-green-600'
            )}
          >
            <p
              className={classnames(
                'text-lg',
                notification.type === 'error' && 'text-red-600',
                notification.type === 'success' && 'text-green-600'
              )}
            >
              {notification.message}{' '}
            </p>
            {notification.type === 'success' && (
              <button
                onClick={() => navigator.clipboard.writeText(`https://btfl.link/${notification.slug}`)}
                className="text-white text-sm bg-green-600 rounded p-2 w-full mt-4"
              >
                Copy {`btfl.link/${notification.slug}`}
              </button>
            )}
            <button
              className={classnames(
                'absolute top-1 right-2 text-md leading-none',
                notification.type === 'error' && 'text-red-600',
                notification.type === 'success' && 'text-green-600'
              )}
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
