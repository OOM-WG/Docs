import { defineConfig } from 'vite-plus'

export default defineConfig({
	fmt: {
		arrowParens: 'avoid',
		bracketSameLine: true,
		jsxSingleQuote: true,
		semi: false,
		sortImports: true,
		sortTailwindcss: true,
		trailingComma: 'none',
		ignorePatterns: ['*-lock.*', '*.lock', '**/.nuxt/**', '**/.output/**', '**/dist/**', '**/build/**', '**/target/**']
	}
})