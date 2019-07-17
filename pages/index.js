import axios from 'axios'

export default () => {
  const [slug, setSlug] = React.useState('')
  const [link, setLink] = React.useState('')

  const onSubmit = e => {
    e.preventDefault()
    axios.post('/redirect', { slug, link })
  }

  return (
    <div>
      <h1>btfl.link - The Last URL Shortener You Will Ever Need</h1>
      <form onSubmit={onSubmit}>
        <label>
          Slug
          <input value={slug} onChange={e => setSlug(e.target.value)} />
        </label>
        <label>
          Link
          <input value={link} onChange={e => setLink(e.target.value)} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}
