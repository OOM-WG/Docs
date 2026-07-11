'use client'

import { forceCollide, forceLink, forceManyBody } from 'd3-force'
import { useRouter } from 'fumadocs-core/framework'
import { useLocale } from 'next-intl'
import { type RefObject, lazy, useEffect, useMemo, useRef, useState } from 'react'
import type { ForceGraphMethods, ForceGraphProps, LinkObject, NodeObject } from 'react-force-graph-2d'

import { type Locale } from '@/i18n/routing'
import { isExternalHref, localizeInternalHref } from '@/lib/locale-path'

import type { Graph, GraphViewLink, GraphViewNode, LinkType, NodeId, NodeType } from './graph-view'

const ForceGraph2D = lazy(() => import('react-force-graph-2d')) as typeof import('react-force-graph-2d').default

export const GraphViewClient = ({
	containerRef,
	graph,
	initialZoom
}: {
	containerRef: RefObject<HTMLDivElement | null>
	graph: Graph
	initialZoom: number
}) => {
	const graphRef = useRef<ForceGraphMethods<any, any> | undefined>(undefined)
	const hoveredRef = useRef<GraphNode | null>(null)
	const initialFitRef = useRef(false)
	const locale = useLocale() as Locale
	const router = useRouter()
	const [size, setSize] = useState({ height: 0, width: 0 })
	const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const updateSize = () => {
			const rect = container.getBoundingClientRect()
			setSize({ height: rect.height, width: rect.width })
		}
		updateSize()

		const observer = new ResizeObserver(updateSize)
		observer.observe(container)
		return () => observer.disconnect()
	}, [containerRef])

	const handleNodeHover = (node: GraphNode | null) => {
		const graph = graphRef.current
		if (!graph) return
		hoveredRef.current = node

		if (node) {
			if (!isFiniteNumber(node.x) || !isFiniteNumber(node.y)) return setTooltip(null)
			const coords = graph.graph2ScreenCoords(node.x, node.y)
			if (!isFiniteNumber(coords.x) || !isFiniteNumber(coords.y)) return setTooltip(null)

			if (!node.description) return setTooltip(null)
			setTooltip({ x: coords.x + 4, y: coords.y + 4, content: node.description })
		} else setTooltip(null)
	}

	const nodeCanvasObject: ForceGraphProps['nodeCanvasObject'] = (node, ctx) => {
		const graphNode = node as GraphNode
		const container = containerRef.current
		if (!container) return
		const style = getComputedStyle(container)
		const fontSize = 14
		const radius = 6
		if (!isFiniteNumber(graphNode.x) || !isFiniteNumber(graphNode.y)) return

		ctx.beginPath()
		ctx.arc(graphNode.x, graphNode.y, radius, 0, 2 * Math.PI, false)

		const hoverNode = hoveredRef.current
		const isActive = hoverNode?.id === graphNode.id || hoverNode?.neighbors?.includes(graphNode.id)

		ctx.fillStyle = isActive
			? style.getPropertyValue('--color-primary')
			: `color-mix(in oklab, ${style.getPropertyValue('--color-primary')} 46%, ${style.getPropertyValue('--color-base-100')})`
		ctx.fill()

		ctx.font = `${fontSize}px "Ubuntu Sans Variable", "Ubuntu Sans", sans-serif`
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = style.getPropertyValue('--color-base-content')
		ctx.fillText(graphNode.text, graphNode.x, graphNode.y + radius + fontSize)
	}

	const linkColor = (link: LinkObject) => {
		const container = containerRef.current
		if (!container) return '#999'
		const style = getComputedStyle(container)
		const hoverNode = hoveredRef.current

		if (hoverNode && (hoverNode.id === getEndpointId(link.source) || hoverNode.id === getEndpointId(link.target)))
			return style.getPropertyValue('--color-primary')

		return `color-mix(in oklab, ${style.getPropertyValue('--color-base-content')} 22%, transparent)`
	}

	const enrichedGraph = useMemo(() => {
		const nodes = graph.nodes.map(node => ({ ...node })) as GraphNode[]
		const links = graph.links.map(link => ({ ...link })) as GraphLink[]

		for (const node of nodes)
			node.neighbors = links.flatMap(link => {
				const source = getEndpointId(link.source)
				const target = getEndpointId(link.target)
				if (source === node.id && isNodeId(target)) return [target]
				if (target === node.id && isNodeId(source)) return [source]
				return []
			})

		return { nodes, links }
	}, [graph])

	const fitInitialView = () => {
		if (initialFitRef.current) return
		const graph = graphRef.current
		if (!graph) return

		initialFitRef.current = true
		graph.zoom(initialZoom, 0)
	}

	return (
		<>
			{size.width > 0 && size.height > 0 && (
				<ForceGraph2D
					ref={{
						get current() {
							return graphRef.current
						},
						set current(fg) {
							graphRef.current = fg
							if (fg) {
								fg.d3Force('link', forceLink().distance(200))
								fg.d3Force('charge', forceManyBody().strength(10))
								fg.d3Force('collision', forceCollide(60))
								fitInitialView()
							}
						}
					}}
					graphData={enrichedGraph}
					height={size.height}
					linkColor={linkColor}
					linkWidth={2}
					nodeCanvasObject={nodeCanvasObject}
					onNodeClick={node => {
						const graphNode = node as GraphNode
						if (!graphNode.url) return
						if (isExternalHref(graphNode.url)) return window.open(graphNode.url, '_blank')
						void router.push(localizeInternalHref(graphNode.url, locale))
					}}
					onNodeHover={node => handleNodeHover(node as GraphNode | null)}
					onEngineStop={fitInitialView}
					width={size.width}
					enableNodeDrag
					enableZoomInteraction
				/>
			)}
			{tooltip && (
				<div
					className='bg-base-100 text-base-content border-base-content/10 pointer-events-none absolute size-fit max-w-xs rounded-xl border p-3 text-sm shadow-lg'
					style={{ top: tooltip.y, left: tooltip.x }}>
					{tooltip.content}
				</div>
			)}
		</>
	)
}

type GraphNode = NodeObject<NodeType> & GraphViewNode
type GraphLink = LinkObject<NodeType, LinkType> & GraphViewLink

const getEndpointId = (endpoint: LinkObject['source']) => (typeof endpoint === 'object' && endpoint ? endpoint.id : endpoint)

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)

const isNodeId = (value: unknown): value is NodeId => typeof value === 'number' || typeof value === 'string'