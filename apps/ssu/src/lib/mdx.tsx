import * as AccordionWidgets from 'fumadocs-ui/components/accordion'
import * as CodeBlockWidgets from 'fumadocs-ui/components/codeblock'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import * as FilesWidgets from 'fumadocs-ui/components/files'
import { GithubInfo } from 'fumadocs-ui/components/github-info'
import * as StepsWidgets from 'fumadocs-ui/components/steps'
import * as TabsWidgets from 'fumadocs-ui/components/tabs'
import { TypeTable } from 'fumadocs-ui/components/type-table'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { type ComponentPropsWithoutRef } from 'react'

import { GraphView } from '@/components/graph-view'
import ImageZoom from '@/components/image-zoom'
import { SiteLink } from '@/components/site-link'

export const mdxComponents = {
	SiteLink,
	...defaultMdxComponents,
	...AccordionWidgets,
	...CodeBlockWidgets,
	pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => (
		<CodeBlock {...props}>
			<Pre>{children}</Pre>
		</CodeBlock>
	),
	...FilesWidgets,
	GithubInfo,
	GraphView,
	Image,
	ImageZoom,
	img: props => <ImageZoom {...(props as any)} />,
	Link,
	...StepsWidgets,
	...TabsWidgets,
	TypeTable
} satisfies MDXComponents