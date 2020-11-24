import axios from 'axios'
import randomstring from 'randomstring'
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
        message: 'Successfully created link. Click me to copy.',
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
    <form onSubmit={onSubmit} className="mt-10 flex flex-col w-96">
      <input
        required
        type="URL"
        value={url}
        onChange={(e) => setUrlValue(e.target.value)}
        placeholder="URL"
        autoFocus
        className="input mb-0.5"
      />
      <div className="flex mb-0.5">
        <input
          required
          value={slug}
          onChange={(e) => setSlugValue(e.target.value)}
          placeholder="Slug"
          className="input flex-grow"
        />
        <button
          type="button"
          onClick={() =>
            setSlugValue(randomstring.generate({ length: 6, charset: 'alphabetic', capitalization: 'lowercase' }))
          }
          className="bg-bg-light ml-0.5 w-24 text-white flex items-center justify-center focus:bg-bg-white-light focus:outline-none hover:text-accent-1 hover:bg-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M13.5 2c-5.288 0-9.649 3.914-10.377 9h-3.123l4 5.917 4-5.917h-2.847c.711-3.972 4.174-7 8.347-7 4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5c-3.015 0-5.662-1.583-7.171-3.957l-1.2 1.775c1.916 2.536 4.948 4.182 8.371 4.182 5.797 0 10.5-4.702 10.5-10.5s-4.703-10.5-10.5-10.5z" />
          </svg>
        </button>
      </div>
      <div className="flex">
        <div className="bg-bg-light text-white p-5 flex-grow">https://btfl.link/{slug}</div>
        <button
          className="w-24 ml-0.5 text-white bg-bg-light focus:outline-none focus:bg-bg-white-light hover:bg-white hover:text-accent-1 transition-colors"
          disabled={isLoading}
        >
          Create
        </button>
      </div>
    </form>
  )
}
