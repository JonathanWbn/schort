import upstash from '@upstash/redis'

const redis = upstash(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN)

export function set(key: string, value: string) {
  return redis.set(key, value)
}

export async function get(key: string) {
  const { data } = await redis.get(key)

  return data
}
