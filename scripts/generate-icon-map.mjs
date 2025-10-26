/*
 * Copyright (c) YumeYuka 2025.
 */

#!/usr/
bin / env
node
import {readFileSync, writeFileSync} from 'fs'
import {globSync} from 'glob'
import matter from 'gray-matter'

console.log('Scanning markdown files for icons...')

const files = globSync('src/**/*.md')
const icons = new Set()

files.forEach(file => {
    try {
        const content = readFileSync(file, 'utf-8')
        const {data} = matter(content)
        if (data.icon) {
            icons.add(data.icon)
        }
    } catch (error) {
        console.warn(`Warning: Failed to parse ${file}:`, error.message)
    }
})

console.log(`Found ${icons.size} unique icons`)

const importStatements = []
const mapEntries = []

icons.forEach(icon => {
    const pascalCase = icon
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')

    importStatements.push(pascalCase)
    mapEntries.push(`  '${icon}': ${pascalCase}`)
})

const code = `/*
 * Copyright (c) YumeYuka 2025.
 */

import { ${importStatements.join(', ')} } from 'lucide-vue-next'

export const iconComponentMap: Record<string, any> = {
${mapEntries.join(',\n')}
}

const pascalCaseCache = new Map<string, any>()

export function getIconComponent(iconName: string | undefined): any {
  if (!iconName) return null
  
  if (pascalCaseCache.has(iconName)) {
    return pascalCaseCache.get(iconName)
  }
  
  const component = iconComponentMap[iconName]
  
  if (component) {
    pascalCaseCache.set(iconName, component)
  }
  
  return component || null
}
`

writeFileSync('.vitepress/theme/icons-map.ts', code, 'utf-8')
console.log(`Generated .vitepress/theme/icons-map.ts with ${icons.size} icons`)
console.log('Icons:', Array.from(icons).sort().join(', '))

