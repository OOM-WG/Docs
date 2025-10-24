/*
 * Copyright (c) YumeYuka 2025.
 */

export function onRequest(context) {
    const {path} = context.params
    return Response.redirect(
        `https://ssu.noidx.sawahara.host/assets/${Array.isArray(path) ? path.join('/') : path || ''}`,
        301
    )
}
