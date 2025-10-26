/*
 * Copyright (c) YumeYuka 2025.
 */

import {
    Monitor,
    Smartphone,
    Lock,
    Scale,
    FileCheck,
    Wrench,
    Box,
    Cat,
    Fingerprint,
    ShieldCheck,
    Radio,
    FileText,
    ScrollText,
    Lightbulb,
    FolderTree,
    Layers,
    Cog,
    Sparkles,
    Shield,
    Puzzle,
    Heart,
    Link,
    Globe,
    Cpu,
    Settings,
    Code,
    LayoutDashboard,
    Package,
    House,
    Download,
    HelpCircle
} from 'lucide-vue-next'

export const iconComponentMap: Record<string, any> = {
    'monitor': Monitor,
    'smartphone': Smartphone,
    'lock': Lock,
    'scale': Scale,
    'file-check': FileCheck,
    'wrench': Wrench,
    'box': Box,
    'cat': Cat,
    'fingerprint': Fingerprint,
    'shield-check': ShieldCheck,
    'radio': Radio,
    'file-text': FileText,
    'scroll-text': ScrollText,
    'lightbulb': Lightbulb,
    'folder-tree': FolderTree,
    'layers': Layers,
    'cog': Cog,
    'sparkles': Sparkles,
    'shield': Shield,
    'puzzle': Puzzle,
    'heart': Heart,
    'link': Link,
    'globe': Globe,
    'cpu': Cpu,
    'settings': Settings,
    'code': Code,
    'layout-dashboard': LayoutDashboard,
    'package': Package,
    'house': House,
    'download': Download,
    'help-circle': HelpCircle
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
