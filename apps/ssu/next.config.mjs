import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withMDX = createMDX()
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default withNextIntl(
	withMDX({
		reactStrictMode: true,
		allowedDevOrigins: ['127.0.0.1']
	})
)