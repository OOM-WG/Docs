/*
 * Copyright (c) YumeYuka 2025.
 *
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
 */

import {promises as fs} from 'fs'
import {glob} from 'glob'
import {minify} from 'html-minifier-terser'

const distDir = 'dist'
const minifyOptions = {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyCSS: true,
    removeAttributeQuotes: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
}

async function run() {
    try {
        const files = await glob(`${distDir}/**/*.html`)
        console.log(`Found ${files.length} HTML files to minify.`)

        for (const file of files) {
            const source = await fs.readFile(file, 'utf8')
            const minified = await minify(source, minifyOptions)
            await fs.writeFile(file, minified)
            console.log(`Minified: ${file}`)
        }
        console.log('\nMinification complete!')
    } catch (err) {
        console.error('An error occurred:', err)
    }
}

run()
