'use client'

import { lazy, Suspense, useMemo, useRef, useSyncExternalStore } from 'react'

export interface Graph {
	links: GraphViewLink[]
	nodes: GraphViewNode[]
}

export type NodeId = number | string

export type GraphViewNode = NodeType & {
	id: NodeId
}

export type GraphViewLink = LinkType & {
	source: NodeId
	target: NodeId
}

export interface NodeType {
	text: string
	description?: string
	neighbors?: NodeId[]
	url?: string
}

export type LinkType = Record<string, unknown>

export interface GraphViewProps {
	className?: string
	graph?: Graph
	height?: number | string
	initialZoom?: number
	links?: GraphViewLink[]
	nodes?: GraphViewNode[]
}

const GraphViewClient = lazy(() => import('./graph-view-client').then(module => ({ default: module.GraphViewClient })))

export const GraphView = ({ className, graph, height = 369, initialZoom = 0.88, links = [], nodes = [] }: GraphViewProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const mounted = useSyncExternalStore(
		() => () => void null,
		() => true,
		() => false
	)
	const resolvedGraph = useMemo(() => graph ?? { links, nodes }, [graph, links, nodes])

	return (
		<div
			ref={ref}
			className={`border-base-content/10 bg-base-100/70 relative overflow-hidden rounded-xl border [&_canvas]:size-full ${className ?? ''}`}
			style={{ height }}>
			{mounted && (
				<Suspense fallback={<div className='bg-base-200/60 h-full w-full animate-pulse' />}>
					<GraphViewClient graph={resolvedGraph} initialZoom={initialZoom} containerRef={ref} />
				</Suspense>
			)}
		</div>
	)
}