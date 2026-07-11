import { ImageResponse } from 'next/og'

import { type MainConfig, type ProjectConfig, type ProjectKey, baseHost, projectName } from '@/content/site'
import { ssuIconBase64, suuIconBase64, ubuntuSansBoldBase64, ubuntuSansRegularBase64 } from '@/generated'

import { base64ToArrayBuffer } from './base64'

export const size = {
	width: 1200,
	height: 630
}

export const contentType = 'image/png'

export const alt = 'ShiroSU'

const regularFont = base64ToArrayBuffer(ubuntuSansRegularBase64)
const boldFont = base64ToArrayBuffer(ubuntuSansBoldBase64)

export const openGraphImage = (config: MainConfig | ProjectConfig, project?: ProjectKey) => {
	const logoSrc = `data:image/png;base64,${project === 'utils' ? suuIconBase64 : ssuIconBase64}`
	const pageName = project ? projectName(config as ProjectConfig) : config.name
	const hostname = project ? `${baseHost}/${project}` : baseHost

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				background: 'linear-gradient(135deg, #fff8ee 0%, #f7ead8 48%, #e6be8a 100%)',
				color: '#24180f',
				fontFamily: 'Ubuntu Sans',
				padding: 72
			}}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
				<div
					style={{
						width: 92,
						height: 92,
						borderRadius: 22,
						background: '#fffaf3',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 18px 48px rgba(70, 38, 8, 0.18)'
					}}>
					<img src={logoSrc} width={68} height={68} />
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ fontSize: 34, fontWeight: 800 }}>{config.shortTitle}</div>
					<div style={{ color: '#7b5222', fontSize: 22, marginTop: 4 }}>{hostname}</div>
				</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ color: '#8d5f27', fontSize: 30, fontWeight: 800, marginBottom: 22 }}>{config.summary}</div>
				<div style={{ fontSize: 74, lineHeight: 1.04, fontWeight: 900, maxWidth: 940 }}>{pageName}</div>
				<div style={{ fontSize: 30, lineHeight: 1.35, color: '#60462c', maxWidth: 940, marginTop: 28 }}>
					{config.description}
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', color: '#7b5222', fontSize: 24 }}>
				<div>OOM WG</div>
				<div>ShiroSU</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Ubuntu Sans', data: regularFont, weight: 400, style: 'normal' },
				{ name: 'Ubuntu Sans', data: boldFont, weight: 700, style: 'normal' }
			]
		}
	)
}