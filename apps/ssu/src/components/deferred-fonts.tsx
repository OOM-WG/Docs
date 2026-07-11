'use client'

import { useEffect } from 'react'

export const DeferredFonts = () => (useEffect(() => void setTimeout(() => void import('@/styles/fonts.css')), []), null)