import { formatSlug } from '../utils'
import getDb from './db'

const btflLinkUrlRegex = /^https:\/\/btfl\.link\//

export default async (req, res) => {
  const { url } = req.body
  const slug = formatSlug(req.body.slug)

  if (btflLinkUrlRegex.test(url)) {
    return res.status(400).send("You can't link to a btfl.link address.")
  }

  const db = await getDb()
  const redirectsCollection = await db.collection('redirects')

  const existingRedirect = await redirectsCollection.findOne({ slug })

  if (existingRedirect) res.status(400).send('This slug already exists.')
  else {
    await redirectsCollection.insertOne({ slug, url })
    res.json({ success: true, slug })
  }
}
