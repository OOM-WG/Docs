import type { Graph } from 'schema-dts'

export const JsonLd = ({ data }: { data: Graph }) => (
	<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
)