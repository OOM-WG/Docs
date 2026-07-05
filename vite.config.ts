import { defineConfig } from 'vite-plus'

export default defineConfig({
	staged: { '*': 'vp check --fix' },
	lint: {
		ignorePatterns: ['docs/**', '**/vendor/**'],
		options: {
			typeAware: true,
			typeCheck: false
		},
		plugins: ['typescript', 'react'],
		env: { browser: true, node: true },
		rules: {
			eqeqeq: ['error', 'always'],
			'no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'no-empty': 'off',
			'no-shadow': 'off',
			'no-undef': 'off',
			'typescript/restrict-template-expressions': 'off',
			'typescript/no-unsafe-type-assertion': 'off',
			'typescript/consistent-return': 'off',
			'react/react-in-jsx-scope': 'off'
		}
	},
	fmt: {
		arrowParens: 'avoid',
		bracketSameLine: true,
		jsxSingleQuote: true,
		semi: false,
		sortImports: true,
		sortTailwindcss: true,
		trailingComma: 'none',
		ignorePatterns: ['*-lock.*', '*.lock', '**/vendor/**']
	}
})