import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export async function middleware(req) {
	const [, path] = req.nextUrl.pathname.split('/')

	if (!path) {
		return
	}

	console.log('Checking for redirect:', path)

	const data = await redis.get(path)

	console.log('Redirect data:', data)

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
		'/:path((?!api|_next/static|favicon.ico|robots.txt).*)',
	],
}
