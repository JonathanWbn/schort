import axios from 'axios'

export default () => {
  const [slug, setSlug] = React.useState('')
  const [url, setUrl] = React.useState('')

  const onSubmit = async e => {
    e.preventDefault()
    await axios.post('/redirect', { slug, url })
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input required type="URL" value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
        <input required value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" />
        <div className="row-wrapper">
          <div className="preview">https://btfl.link/{slug}</div>
          <button>Create</button>
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
