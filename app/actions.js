'use server'

import { Redis } from '@upstash/redis'
import 'isomorphic-fetch'

const btflLinkUrlRegex = /^https?:\/\/schort\.me\//

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function saveRedirect(slug, url) {
  if (btflLinkUrlRegex.test(url)) {
    return { success: false, error: "You can't link to a schort.me address." }
  }

  const existingRedirect = await redis.get(slug)

  if (existingRedirect) {
    return { success: false, error: 'This slug is already taken.' }
  } else {
    await redis.set(slug, url)
    return { success: true, slug }
  }
}
