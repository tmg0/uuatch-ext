<script lang="ts" setup>
interface DOMSelectorEvent {
  xpath: string
  element: HTMLElement
}

const xpath = ref('')
const location = useBrowserLocation()
const { watches } = useStore()

const params = computed(() => ({
  xpath: xpath.value,
  url: location.value.href ?? ''
}))

const onSelect = (e: DOMSelectorEvent) => {
  xpath.value = e.xpath
  watches.value = [...watches.value, params.value]
}
</script>

<template>
  <DOMSelector @select="onSelect" />
</template>
