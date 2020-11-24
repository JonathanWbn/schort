import getDb from '../db'

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const { slug } = req.query

      const db = await getDb()
      const redirectsCollection = await db.collection('redirects')
      const redirect = await redirectsCollection.findOne({ slug })

      if (redirect) {
        res.writeHead(301, { Location: redirect.url })
        res.end()
      } else {
        res.send(`There is no redirect for ${slug}.`)
      }
    }
  }
}
