export const useStore = () => {
  const isAvailable = useWebExtensionStorage<boolean>('_UUATCH:IS_AVAILABLE', false)
  return { isAvailable }
}
