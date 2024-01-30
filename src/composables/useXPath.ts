import { type MaybeRef } from "@vueuse/core"
import getXPath from 'get-xpath'

export const useXPath = (element: MaybeRef<HTMLElement | null>) => {
  const xpath = computed(() => getXPath(unref(element)))
  return { xpath }
}