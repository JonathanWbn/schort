import axios from 'axios'
import classnames from 'classnames'
import React from 'react'

import { copyToClipboard, formatSlug } from '../utils'

export default function Form() {
  const [slug, setSlug] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [notification, setNotification] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <>
      <form onSubmit={onSubmit} className="mt-10 flex flex-col w-full max-w-sm">
        <div className="flex mb-0.5 input-wrapper">
          <label htmlFor="url" className="label">
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
            className="input flex-grow"
          />
        </div>
        <div className="flex mb-5 input-wrapper">
          <label htmlFor="slug" className="label">
            Slug
          </label>
          <input
            required
            value={slug}
            placeholder="e.g. join-call"
            id="slug"
            onChange={(e) => setSlugValue(e.target.value)}
            className="input flex-grow"
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
                onClick={() => copyToClipboard(`https://btfl.link/${notification.slug}`)}
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
