/* eslint-disable next/no-img-element */

import { headers } from 'next/headers'
import { ImageResponse } from 'next/og'

import { baseHost, siteConfigs } from '@/content/site'
import { ssuIconBase64, suuIconBase64, ubuntuSansBoldBase64, ubuntuSansRegularBase64 } from '@/generated'
import { base64ToArrayBuffer } from '@/lib/base64'
import { getSiteFromHost } from '@/lib/routing'

export const size = {
	width: 1200,
	height: 630
}

export const contentType = 'image/png'

const regularFont = base64ToArrayBuffer(ubuntuSansRegularBase64)
const boldFont = base64ToArrayBuffer(ubuntuSansBoldBase64)

export default async () => {
	const config = siteConfigs[getSiteFromHost((await headers()).get('host'))]
	const logoSrc = `data:image/png;base64,${config.key === 'utils' ? suuIconBase64 : ssuIconBase64}`

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
					<div style={{ fontSize: 34, fontWeight: 800 }}>{config.title}</div>
					<div
						style={{
							color: '#7b5222',
							fontSize: 22,
							marginTop: 4
						}}>{`${config.key !== 'main' ? `${config.key}.` : ''}${baseHost}`}</div>
				</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ color: '#8d5f27', fontSize: 30, fontWeight: 800, marginBottom: 22 }}>{config.hero.eyebrow}</div>
				<div style={{ fontSize: 74, lineHeight: 1.04, fontWeight: 900, maxWidth: 940 }}>{config.label}</div>
				<div style={{ fontSize: 30, lineHeight: 1.35, color: '#60462c', maxWidth: 940, marginTop: 28 }}>
					{config.description}
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', color: '#7b5222', fontSize: 24 }}>
				<div>回忆溢出工作组</div>
				<div>ShiroSU</div>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{
					name: 'Ubuntu Sans',
					data: regularFont,
					weight: 400,
					style: 'normal'
				},
				{
					name: 'Ubuntu Sans',
					data: boldFont,
					weight: 700,
					style: 'normal'
				}
			]
		}
	)
}