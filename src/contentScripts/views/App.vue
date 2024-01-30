<script lang="ts" setup>
import 'uno.css'

const { x, y } = useMouse({ type: 'client' })
const { element } = useElementByPoint({ x, y })
const bounding = reactive(useElementBounding(element))

useEventListener('scroll', bounding.update, true)

const boxStyles = computed(() => {
  if (element.value) {
    return {
      display: 'block',
      width: `${bounding.width}px`,
      height: `${bounding.height}px`,
      left: `${bounding.left}px`,
      top: `${bounding.top}px`,
      backgroundColor: '#3eaf7c44',
      transition: 'all 0.05s linear',
    }
  }
  return {
    display: 'none',
  }
})
</script>

<template>
  <div :style="boxStyles" fixed pointer-events-none z-9999 border="1 $vp-c-brand" />
</template>
