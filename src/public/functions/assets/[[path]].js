/*
 * Copyright (c) YumeYuka 2025.
 *
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
 */

export function onRequest(context) {
    const {path} = context.params
    return Response.redirect(
        `https://ssu.noidx.sawahara.host/assets/${Array.isArray(path) ? path.join('/') : path || ''}`,
        301
    )
}
