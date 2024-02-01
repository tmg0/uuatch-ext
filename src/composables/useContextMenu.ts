import { type Menus } from 'webextension-polyfill'
import { nanoid } from 'nanoid'
import { defu } from 'defu'
import { displayName } from '../../package.json'

interface ContextMenu {
  id: string
  title: string
  contexts?: Menus.ContextType[]
}

export const defineContextMenu = <T extends ContextMenu>(options: T) => defu(options, { contexts: ['selection'] }) as ContextMenu

export const UUATCH_CONTEXT_MENU = defineContextMenu({ id: nanoid(), title: displayName })
