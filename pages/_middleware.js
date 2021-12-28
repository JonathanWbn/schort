import { get, auth } from '@upstash/redis'
import { NextResponse } from 'next/server'

auth(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN)

export async function middleware(req) {
  const [, path] = req.nextUrl.pathname.split('/')

  if (['favicon.svg', 'api', ''].includes(path)) {
    return
  }

  const { data } = await get(path)

  if (data) {
    return NextResponse.redirect(data)
  }
}
