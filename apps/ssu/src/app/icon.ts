import { headers } from 'next/headers'

import { ssuIconBase64, suuIconBase64 } from '@/generated'
import { base64ToBytes } from '@/lib/base64'
import { getSiteFromHost } from '@/lib/routing'

export const size = {
	width: 128,
	height: 128
}

export const contentType = 'image/png'

export default async () =>
	new Response(base64ToBytes(getSiteFromHost((await headers()).get('host')) === 'utils' ? suuIconBase64 : ssuIconBase64), {
		headers: { 'Content-Type': contentType }
	})