import axios from 'axios'
import classnames from 'classnames'

import { ToastContext } from '../pages'
import { copyToClipboard, formatSlug } from '../utils'

export default function Form() {
  const [slug, setSlug] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { toast, setToast } = React.useContext(ToastContext)

  React.useEffect(() => {
    if (toast) setToast({ ...toast, disappear: 300 })
  }, [slug, url]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async e => {
    e.preventDefault()
    try {
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
      })
    } catch (error) {
      setToast({
        message: error.response.data || 'Something went wrong. :/',
        disappear: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input required type="URL" value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
        <input required value={slug} onChange={e => setSlug(formatSlug(e.target.value))} placeholder="Slug" />
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
        button {
          background-color: var(--background-light);
          border: none;
          padding: 25px;
          color: var(--white);
          width: 100px;
          font-size: 15px;
          transition: 0.3s all;
          cursor: pointer;
          font-weight: 600;
          margin-left: 2px;
        }
        button:hover {
          background-color: var(--background-white);
          color: var(--main-accent);
        }
        button.loading {
          cursor: not-allowed;
          color: var(--light-white);
          background-color: var(--background-light);
        }
        .preview {
          background-color: var(--background-light);
          width: 298px;
          color: var(--white);
          font-size: 15px;
          padding: 25px;
          font-weight: 600;
          overflow: scroll;
        }
        .row-wrapper {
          display: flex;
        }
      `}</style>
    </>
  )
}
