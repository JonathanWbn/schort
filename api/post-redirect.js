import { formatSlug } from '../utils'
import getDb from './db'

export default async (req, res) => {
  const { url } = req.body
  const slug = formatSlug(req.body.slug)

  const db = await getDb()
  const redirectsCollection = await db.collection('redirects')

  const existingRedirect = await redirectsCollection.findOne({ slug })

  if (existingRedirect) res.status(400).send('This slug already exists.')
  else {
    await redirectsCollection.insertOne({ slug, url })
    res.json({ success: true, slug })
  }
}
