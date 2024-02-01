<script lang="ts" setup>
import { useXPath } from '~/composables/useXPath'

const emit = defineEmits(['select'])

const { x, y } = useMouse({ type: 'client' })
const { element, pause, resume } = useElementByPoint({ x, y })
const { text } = useTextSelection()
const bounding = reactive(useElementBounding(element))
const { alt_s } = useMagicKeys()
const { xpath } = useXPath(element)

const isPinned = ref(false)
const { isAvailable } = useStore()

onKeyStroke('Escape', (e) => {
  if (isAvailable.value) { return }
  e.preventDefault()
  isPinned.value = false
})

watch(alt_s, (value) => {
  if (!isAvailable.value) { return }
  if (!element.value) { return }
  if (value) {
    consola.info(`[UUatch-DOM XPath] : ${xpath.value}`)
    isPinned.value = true
    emit('select', { xpath: xpath.value, element: element.value })
  }
})

watch(isAvailable, (value) => {
  if (!value) { pause() }
})

watch(() => [text.value, isPinned.value], ([_text, _isPinned]) => {
  if (_isPinned) { return }
  _text ? useThrottleFn(() => { pause() }, 500)() : resume()
})

useEventListener('scroll', bounding.update, true)

const boxStyles = computed(() => {
  if (element.value && isAvailable.value) {
    return {
      display: 'block',
      width: `${bounding.width}px`,
      height: `${bounding.height}px`,
      left: `${bounding.left}px`,
      top: `${bounding.top}px`,
      backgroundColor: '#3eaf7c44',
      transition: 'all 0.05s linear'
    }
  }
  return {
    display: 'none'
  }
})
</script>

<template>
  <div :style="boxStyles" fixed pointer-events-none z-9999 border="1 $vp-c-brand" />
</template>
