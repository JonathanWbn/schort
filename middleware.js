import { Redis } from '@upstash/redis'
import 'isomorphic-fetch'
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export async function middleware(req) {
  const [, path] = req.nextUrl.pathname.split('/')

  if (!path) {
    return
  }

  const data = await redis.get(path)

  if (data) {
    return NextResponse.redirect(data)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/:path((?!api|_next/static|favicon.svg).*)',
  ],
}
