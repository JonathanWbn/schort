'use client'

import axios from 'axios'
import classnames from 'classnames'
import { useState } from 'react'

import { formatSlug } from '../utils'

export default function Form() {
  const [slug, setSlug] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
            onChange={(e) => setUrlValue(e.target.value)}
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
            onChange={(e) => setSlugValue(e.target.value)}
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
              onClick={() => setNotification(null)}
            >
              x
            </button>
          </div>
        </div>
      )}
    </>
  )

  function setSlugValue(value) {
    setNotification(null)
    setSlug(formatSlug(value))
  }

  function setUrlValue(value) {
    setNotification(null)
    setUrl(value)
  }

  async function onSubmit(e) {
    e.preventDefault()

    try {
      if (!isValidSlug(slug)) {
        setNotification({
          message: 'Your slug shall only include numerals, letters and/or hyphens.',
          type: 'error',
        })
        return
      }

      setIsLoading(true)

      const { data } = await axios.post('/api/redirect', { slug, url })

      setSlug('')
      setUrl('')
      setNotification({
        message: 'Successfully created link.',
        slug: data.slug,
        type: 'success',
      })
    } catch (error) {
      setNotification({
        message: error.response.data || 'Something went wrong. :/',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  function isValidSlug(slug) {
    return /^[a-z0-9-]+$/.test(slug)
  }
}
