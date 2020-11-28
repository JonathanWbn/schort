import axios from 'axios'
import React from 'react'

import { ToastContext } from '../pages'
import { copyToClipboard, formatSlug } from '../utils'

export default function Form() {
  const [slug, setSlug] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { toast, setToast } = React.useContext(ToastContext)

  const setSlugValue = (value) => {
    if (toast) setToast({ ...toast, disappear: 300 })
    setSlug(formatSlug(value))
  }

  const setUrlValue = (value) => {
    if (toast) setToast({ ...toast, disappear: 300 })
    setUrl(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!/^[a-z0-9-]+$/.test(slug)) {
        setToast({
          message: 'Your slug shall only include numerals, letters and/or hyphens.',
          disappear: 3000,
          type: 'error',
        })
        return
      }
      setIsLoading(true)
      const { data } = await axios.post('/api/redirect', { slug, url })
      setSlug('')
      setUrl('')
      setToast({
        message: `Successfully created https://btfl.link/${data.slug}. Click me to copy.`,
        onClick: () => {
          copyToClipboard(`https://btfl.link/${data.slug}`)
          setToast({ message: 'Copied.', disappear: 2000, type: 'info' })
        },
        type: 'success',
      })
    } catch (error) {
      setToast({
        message: error.response.data || 'Something went wrong. :/',
        disappear: 3000,
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 flex flex-col w-full max-w-sm">
      <div className="flex mb-0.5">
        <label htmlFor="url" className="label mr-0.5">
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
      <div className="flex mb-1">
        <label htmlFor="slug" className="label mr-0.5">
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
        className="text-sm bg-bg-light text-white transition-colors focus:outline-none focus:bg-white focus:text-accent-1 hover:bg-white hover:text-accent-1 p-3 sm:p-4 font-bold"
        disabled={isLoading}
      >
        Create
      </button>
    </form>
  )
}
