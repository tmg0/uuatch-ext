<script setup lang="ts">
defineProps<{ disabled?: boolean }>()
</script>

<template>
  <img src="/assets/icon-128.png" block :class="{ 'saturate-50': disabled }" alt="extension icon">
</template>
