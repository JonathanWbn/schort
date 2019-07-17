import axios from 'axios'

function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData('Text', text)
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = document.createElement('textarea')
    textarea.textContent = text
    textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textarea)
    textarea.select()
    try {
      return document.execCommand('copy') // Security exception may be thrown by some browsers.
    } catch (ex) {
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

export default () => {
  const [slug, setSlug] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastSuccess, setLastSuccess] = React.useState(null)

  React.useEffect(() => {
    setLastSuccess(null)
  }, [slug, url])

  const onSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axios.post('/redirect', { slug, url })
      setLastSuccess(slug)
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main>
        <h1>
          btfl<span>.</span>link
        </h1>
        <p>the last URL shortener you will ever need.</p>
        <p className="disclaimer">(well, maybe not yet)</p>
        <form onSubmit={onSubmit}>
          <input required type="URL" value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
          <input required value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" />
          <div className="row">
            <div className="preview">https://btfl.link/{slug}</div>
            <button>Create</button>
          </div>
          <div className={`row ${lastSuccess ? '' : 'hidden'}`}>
            <div className="success-toast">
              Created:{' '}
              <a target="_blank" href={`https://btfl.link/${lastSuccess}`}>
                https://btfl.link/{lastSuccess}
              </a>
            </div>
            <button type="button" onClick={() => copyToClipboard(`https://btfl.link/${lastSuccess}`)}>
              Copy
            </button>
          </div>
        </form>
      </main>
      <style jsx>{`
        main {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        h1,
        p {
          color: white;
          font-weight: 500;
          font-size: 25px;
        }
        .disclaimer {
          font-size: 5px;
        }
        h1 {
          font-size: 50px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        h1 span {
          color: rgba(255, 255, 255, 0.5);
        }
        form {
          margin-top: 80px;
          display: flex;
          flex-direction: column;
        }
        input {
          background-color: rgba(255, 255, 255, 0.2);
          border: none;
          margin-bottom: 2px;
          padding: 25px;
          color: white;
          width: 400px;
          font-weight: bold;
          font-size: 14px;
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        button {
          background-color: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 25px;
          color: white;
          width: 100px;
          font-size: 15px;
          transition: 0.3s all;
          cursor: pointer;
          font-weight: 600;
          margin-left: 2px;
        }
        button:hover {
          background-color: rgba(255, 255, 255, 0.8);
          color: #f26e03;
        }
        .preview {
          background-color: rgba(255, 255, 255, 0.2);
          width: 298px;
          color: white;
          font-size: 15px;
          padding: 25px;
          font-weight: 600;
          overflow: scroll;
        }
        .row {
          display: flex;
          margin-bottom: 2px;
          opacity: 1;
          transition: 0.5s all;
        }
        .row.hidden {
          opacity: 0;
        }
        .success-toast {
          background-color: rgba(255, 255, 255, 0.8);
          width: 298px;
          color: #f26e03;
          font-size: 15px;
          padding: 25px;
          font-weight: 500;
          overflow: scroll;
          display: flex;
        }
        .success-toast a {
          font-weight: 600;
          color: #f26e03;
          text-decoration: none;
          margin-left: 5px;
        }
      `}</style>
    </>
  )
}
