import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin'

const withMDX = createMDX()
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default withNextIntl(
	withMDX({
		assetPrefix: process.env.NODE_ENV === 'production' ? '//static.shirosu.my.id' : undefined,
		crossOrigin: 'anonymous',
		images: { unoptimized: true },
		reactStrictMode: true,
		allowedDevOrigins: ['127.0.0.1'],
		experimental: {
			optimizePackageImports: ['@icons-pack/react-simple-icons']
		}
	})
)