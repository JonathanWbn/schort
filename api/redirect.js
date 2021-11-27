import { get, set } from '../lib/redis'
import { formatSlug } from '../utils'

const btflLinkUrlRegex = /^https:\/\/btfl\.link\//

export default async (req, res) => {
  switch (req.method) {
    case 'POST': {
      const { url } = req.body
      const slug = formatSlug(req.body.slug)

      if (btflLinkUrlRegex.test(url)) {
        return res.status(400).send("You can't link to a btfl.link address.")
      }

      const existingRedirect = await get(slug)

      if (existingRedirect) res.status(400).send('This slug already exists.')
      else {
        await set(slug, url)
        res.json({ success: true, slug })
      }
      break
    }
  }
}
