import type { ProjectKey } from '@/content/site'
import { ssuIconBase64, suuIconBase64 } from '@/generated'

import { base64ToBytes } from './base64'

export const iconResponse = (project?: ProjectKey) =>
	new Response(base64ToBytes(project === 'utils' ? suuIconBase64 : ssuIconBase64), {
		headers: { 'Content-Type': 'image/png' }
	})