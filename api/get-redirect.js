import url from 'url'

import getDb from './db'

export default async (req, res) => {
  const { pathname } = url.parse(req.url)
  const slug = pathname.substr(1).toLowerCase()

  const db = await getDb()
  const redirectsCollection = await db.collection('redirects')
  const redirect = await redirectsCollection.findOne({ slug })

  if (redirect) {
    res.writeHead(302, { Location: redirect.url })
    res.end()
  } else {
    res.send(`There is no redirect for ${slug}`)
  }
}
