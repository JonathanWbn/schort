import { Redis } from '@upstash/redis'
import 'isomorphic-fetch'
import { formatSlug } from '../utils'

const btflLinkUrlRegex = /^https?:\/\/schort\.me\//

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export default async (req, res) => {
  switch (req.method) {
    case 'POST': {
      const { url } = req.body
      const slug = formatSlug(req.body.slug)

      if (btflLinkUrlRegex.test(url)) {
        return res.status(400).send("You can't link to a schort.me address.")
      }

      const existingRedirect = await redis.get(slug)

      if (existingRedirect) res.status(409).send('This slug is already taken.')
      else {
        await redis.set(slug, url)
        res.json({ success: true, slug })
      }
      break
    }
  }
}
