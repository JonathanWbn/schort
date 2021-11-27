import { get } from '../lib/redis'

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const { slug } = req.query

      const redirect = await get(slug)

      if (redirect) {
        res.writeHead(301, { Location: redirect })
        res.end()
      } else {
        res.send(`There is no redirect for ${slug}.`)
      }
    }
  }
}
