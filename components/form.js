import axios from 'axios'
import classnames from 'classnames'
import randomstring from 'randomstring'

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
      if (!/^[a-z0-9]+$/.test(slug)) {
        setToast({
          message: 'Your slug shall be alphanumeric.',
          disappear: 3000,
          background: 'var(--error)',
          color: 'var(--white)',
        })
        return
      }
      setIsLoading(true)
      const { data } = await axios.post('/redirect', { slug, url })
      setSlug('')
      setUrl('')
      setToast({
        message: 'Successfully created link. Click me to copy.',
        onClick: () => {
          copyToClipboard(`https://btfl.link/${data.slug}`)
          setToast({ message: 'Copied.', disappear: 2000 })
        },
        background: 'var(--success)',
        color: 'var(--white)',
      })
    } catch (error) {
      setToast({
        message: error.response.data || 'Something went wrong. :/',
        disappear: 3000,
        background: 'var(--error)',
        color: 'var(--white)',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          required
          type="URL"
          value={url}
          onChange={(e) => setUrlValue(e.target.value)}
          placeholder="URL"
          autoFocus
        />
        <div className="row-wrapper">
          <input
            required
            value={slug}
            onChange={(e) => setSlugValue(e.target.value)}
            placeholder="Slug"
            className="slug-input"
          />
          <button
            type="button"
            onClick={() =>
              setSlugValue(randomstring.generate({ length: 6, charset: 'alphabetic', capitalization: 'lowercase' }))
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M13.5 2c-5.288 0-9.649 3.914-10.377 9h-3.123l4 5.917 4-5.917h-2.847c.711-3.972 4.174-7 8.347-7 4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5c-3.015 0-5.662-1.583-7.171-3.957l-1.2 1.775c1.916 2.536 4.948 4.182 8.371 4.182 5.797 0 10.5-4.702 10.5-10.5s-4.703-10.5-10.5-10.5z" />
            </svg>
          </button>
        </div>
        <div className="row-wrapper">
          <div className="preview">https://btfl.link/{slug}</div>
          <button className={classnames(isLoading && 'loading')} disabled={isLoading}>
            Create
          </button>
        </div>
      </form>
      <style jsx>{`
        form {
          margin-top: 80px;
          display: flex;
          flex-direction: column;
          width: 400px;
        }
        form > * {
          margin-bottom: 2px;
        }
        input {
          background-color: var(--background-light);
          border: none;
          padding: 25px;
          color: var(--white);
          width: 400px;
          font-weight: bold;
          font-size: 14px;
        }
        input::placeholder {
          color: var(--light-white);
        }
        input:focus,
        button:focus {
          background-color: rgba(255, 255, 255, 0.4);
        }
        button {
          background-color: var(--background-light);
          border: none;
          color: var(--white);
          min-width: 100px;
          font-size: 15px;
          transition: 0.3s all;
          cursor: pointer;
          font-weight: bold;
          margin-left: 2px;
        }
        button:hover {
          background-color: var(--background-white);
          color: var(--main-accent);
        }
        button svg {
          fill: var(--white);
          transition: 0.3s all;
        }
        button:hover svg {
          fill: var(--main-accent);
        }
        button.loading {
          cursor: not-allowed;
          color: var(--light-white);
          background-color: var(--background-light);
        }
        .row-wrapper {
          display: flex;
        }
        .row-wrapper > *:first-child {
          flex-grow: 1;
        }
        .preview {
          background-color: var(--background-light);
          color: var(--white);
          font-size: 15px;
          padding: 25px;
          font-weight: bold;
          overflow: scroll;
        }
      `}</style>
    </>
  )
}
