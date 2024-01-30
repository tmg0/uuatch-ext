interface Watch {
  xpath: string
  url: string
}

export const useStore = () => {
  const isAvailable = useWebExtensionStorage<boolean>('_UUATCH:IS_AVAILABLE', false)
  const watches = useWebExtensionStorage<Watch[]>('_UUATCH:WATCHES', [])

  return { isAvailable, watches }
}
