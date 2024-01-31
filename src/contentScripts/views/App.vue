<script lang="ts" setup>
interface DOMSelectorEvent {
  xpath: string
  element: HTMLElement
}

const xpath = ref('')
const location = useBrowserLocation()

const params = computed(() => ({
  xpath: xpath.value,
  url: location.value.href ?? ''
}))

const onSelect = (e: DOMSelectorEvent) => {
  xpath.value = e.xpath
}
</script>

<template>
  <DOMSelector @select="onSelect" />
</template>
