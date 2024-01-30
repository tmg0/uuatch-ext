import { type MaybeRef } from '@vueuse/core'

export type Options = {
  ignoreId: boolean
};

const defaultOptions: Options = {
  ignoreId: false
}

const getXPath = (el: any, customOptions?: Partial< Options >): string => {
  const options = { ...defaultOptions, ...customOptions }
  let nodeElem = el
  if (nodeElem && nodeElem.id && !options.ignoreId) {
    return '//*[@id="' + nodeElem.id + '"]'
  }
  const parts: string[] = []
  while (nodeElem && Node.ELEMENT_NODE === nodeElem.nodeType) {
    let nbOfPreviousSiblings = 0
    let hasNextSiblings = false
    let sibling = nodeElem.previousSibling
    while (sibling) {
      if (sibling.nodeType !== Node.DOCUMENT_TYPE_NODE &&
              sibling.nodeName === nodeElem.nodeName
      ) {
        nbOfPreviousSiblings++
      }
      sibling = sibling.previousSibling
    }
    sibling = nodeElem.nextSibling
    while (sibling) {
      if (sibling.nodeName === nodeElem.nodeName) {
        hasNextSiblings = true
        break
      }
      sibling = sibling.nextSibling
    }
    const prefix = nodeElem.prefix ? nodeElem.prefix + ':' : ''
    const nth = nbOfPreviousSiblings || hasNextSiblings
      ? '[' + (nbOfPreviousSiblings + 1) + ']'
      : ''
    parts.push(prefix + nodeElem.localName + nth)
    nodeElem = nodeElem.parentNode
  }
  return parts.length ? '/' + parts.reverse().join('/') : ''
}

export const useXPath = (element: MaybeRef<HTMLElement | null>) => {
  const xpath = computed(() => getXPath(unref(element)))
  return { xpath }
}
