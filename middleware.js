import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const [, path] = req.nextUrl.pathname.split('/')

  if (!path) {
    return
  }

  const data = await kv.get(path)

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
