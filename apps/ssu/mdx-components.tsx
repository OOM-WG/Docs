import type { MDXComponents } from 'mdx/types'

import { mdxComponents } from '@/lib/mdx'

export const useMDXComponents = (components: MDXComponents) => ({
	...mdxComponents,
	...components
})