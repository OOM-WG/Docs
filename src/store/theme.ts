import {atom} from 'jotai'

import {getLocalTheme} from '@/utils/theme'

export const themeAtom = atom(getLocalTheme())
