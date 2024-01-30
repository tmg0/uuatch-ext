<script lang="ts" setup>
import { useXPath } from '../../composables/useXPath'
import 'uno.css'

const { x, y } = useMouse({ type: 'client' })
const { element, pause, resume } = useElementByPoint({ x, y })
const { text } = useTextSelection()
const bounding = reactive(useElementBounding(element))
const { xpath } = useXPath(element)

const isPinned = ref(false)
const isDisabled = ref(false)

watch(() => [text.value, isPinned.value], ([_text, _isPinned]) => {
  if (_isPinned) { return }
  _text ? onSelect() : resume()
})

useEventListener('scroll', bounding.update, true)

const boxStyles = computed(() => {
  if (element.value && !isDisabled.value) {
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

const onSelect = useThrottleFn(() => {
  consola.info(`[UUatch-DOM XPath] : ${xpath.value}`)
  pause()
}, 500)
</script>

<template>
  <div :style="boxStyles" fixed pointer-events-none z-9999 border="1 $vp-c-brand" />
</template>
