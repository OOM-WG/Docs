import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const packageDir = path.resolve(scriptDir, '..')
const repoDir = path.resolve(packageDir, '..')
const vendorDir = path.join(packageDir, 'vendor', 'mizuki')
const workdir = path.join(packageDir, '.workdir')

console.log('[*] preparing workdir')
mirrorDir(vendorDir, workdir)

overlayDir(path.join(packageDir, 'configs'), path.join(workdir, 'src', 'config'), 'configs')
fixConfigImports(path.join(workdir, 'src', 'config'))

overlayDir(path.join(repoDir, 'docs', 'images'), path.join(workdir, 'public', 'images'), 'images')
overlayDir(path.join(packageDir, 'public'), path.join(workdir, 'public'), 'public')
replaceDir(path.join(packageDir, 'content'), path.join(workdir, 'src', 'content'), 'content')

ensureInstall()
console.log('[*] workdir ready')

function overlayDir(src: string, dest: string, label: string) {
	console.log(`[*] overlay ${label}: ${relative(dest)}`)
	copyDir(src, dest)
}

function fixConfigImports(configDir: string) {
	for (const entry of fs.readdirSync(configDir, { withFileTypes: true })) {
		const entryPath = path.join(configDir, entry.name)

		const source = fs.readFileSync(entryPath, 'utf8')
		const normalized = source
			.replaceAll('from "@/types/config"', 'from "../types/config"')
			.replaceAll("from '@/types/config'", "from '../types/config'")

		if (normalized !== source) fs.writeFileSync(entryPath, normalized)
	}
}

function replaceDir(src: string, dest: string, label: string) {
	console.log(`[*] replace ${label}: ${relative(dest)}`)
	fs.rmSync(dest, { recursive: true, force: true })
	copyDir(src, dest)
}

function mirrorDir(src: string, dest: string, relativePath: string = '') {
	const srcStats = fs.statSync(src)
	if (!srcStats.isDirectory()) return copyFileIfChanged(src, dest)

	fs.mkdirSync(dest, { recursive: true })

	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		const entryPath = path.join(relativePath, entry.name)
		const srcPath = path.join(src, entry.name)
		const destPath = path.join(dest, entry.name)

		if (entry.isDirectory()) mirrorDir(srcPath, destPath, entryPath)
		else if (entry.isSymbolicLink()) copySymlink(srcPath, destPath)
		else if (entry.isFile()) copyFileIfChanged(srcPath, destPath)
	}
}

function copyDir(src: string, dest: string) {
	fs.mkdirSync(dest, { recursive: true })
	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		const srcPath = path.join(src, entry.name)
		const destPath = path.join(dest, entry.name)
		if (entry.isDirectory()) copyDir(srcPath, destPath)
		else if (entry.isSymbolicLink()) copySymlink(srcPath, destPath)
		else if (entry.isFile()) copyFileIfChanged(srcPath, destPath)
	}
}

function copyFileIfChanged(src: string, dest: string) {
	if (fs.existsSync(dest)) {
		const srcStats = fs.statSync(src)
		const destStats = fs.statSync(dest)
		if (
			destStats.isFile() &&
			srcStats.size === destStats.size &&
			Math.trunc(srcStats.mtimeMs) === Math.trunc(destStats.mtimeMs)
		)
			return
	}

	fs.mkdirSync(path.dirname(dest), { recursive: true })
	fs.copyFileSync(src, dest)
	const stats = fs.statSync(src)
	fs.utimesSync(dest, stats.atime, stats.mtime)
}

function copySymlink(src: string, dest: string) {
	if (
		(() => {
			try {
				return fs.existsSync(dest) || fs.lstatSync(dest).isSymbolicLink()
			} catch {
				return false
			}
		})()
	)
		return

	const target = fs.readlinkSync(src)
	fs.mkdirSync(path.dirname(dest), { recursive: true })
	fs.symlinkSync(target, dest)
}

function ensureInstall() {
	console.log('[*] running pnpm install')
	const result = spawnSync('pnpm', ['install', '--frozen-lockfile'], {
		cwd: workdir,
		stdio: 'inherit'
	})
	if (result.status !== 0) throw new Error('run pnpm install failed')
}

function relative(target: string): string {
	return path.relative(packageDir, target) || '.'
}