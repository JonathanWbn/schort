import { get } from '@upstash/redis'
import { NextResponse } from 'next/server'

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
