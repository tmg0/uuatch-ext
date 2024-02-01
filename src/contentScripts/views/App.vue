<script lang="ts" setup>
interface DOMSelectorEvent {
  xpath: string
  element: HTMLElement
}

const xpath = ref('')
const icon = useFavicon()
const location = useBrowserLocation()

const params = computed(() => ({
  xpath: xpath.value,
  url: location.value.href ?? '',
  favicon: icon.value
}))

const onSelect = (e: DOMSelectorEvent) => {
  xpath.value = e.xpath
  console.log(params.value)
}
</script>

<template>
  <DOMSelector @select="onSelect" />
</template>
