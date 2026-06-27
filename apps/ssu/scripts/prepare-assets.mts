import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(scriptDir, '..')
const workspaceRoot = join(projectRoot, '../..')
const fontFilesDir = join(dirname(require.resolve('@fontsource/ubuntu-sans/package.json')), 'files')
const outputDir = join(projectRoot, 'src/generated')
const outputFile = join(outputDir, 'index.ts')

const readBase64 = async (path: string) => (await readFile(path)).toString('base64')

const [ssuIconPngBase64, suuIconPngBase64, ubuntuSansRegularWoffBase64, ubuntuSansBoldWoffBase64] = await Promise.all([
	readBase64(join(workspaceRoot, 'docs/images/logo/ssu.ico')),
	readBase64(join(workspaceRoot, 'docs/images/logo/suu.ico')),
	readBase64(join(fontFilesDir, 'ubuntu-sans-latin-400-normal.woff')),
	readBase64(join(fontFilesDir, 'ubuntu-sans-latin-700-normal.woff'))
])

await writeFile(
	outputFile,
	`
export const ssuIconBase64 = '${ssuIconPngBase64}'
export const suuIconBase64 = '${suuIconPngBase64}'
export const ubuntuSansRegularBase64 = '${ubuntuSansRegularWoffBase64}'
export const ubuntuSansBoldBase64 = '${ubuntuSansBoldWoffBase64}'
`
)