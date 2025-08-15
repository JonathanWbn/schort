'use server'

import { kv } from '@vercel/kv'

const btflLinkUrlRegex = /^https?:\/\/schort\.me\//

export async function saveRedirect(slug, url) {
	if (btflLinkUrlRegex.test(url)) {
		return { success: false, error: "You can't link to a schort.me address." }
	}

	console.log('saving redirect', slug, url)

	const existingRedirect = await kv.get(slug)

	if (existingRedirect) {
		return { success: false, error: 'This slug is already taken.' }
	} else {
		await kv.set(slug, url)
		return { success: true, slug }
	}
}
