<script setup lang="ts">
const { isAvailable } = useStore()

const toggleAvailable = () => { isAvailable.value = !isAvailable.value }
</script>

<template>
  <main w="300px" px-4 py-5 text-gray-700>
    <nav flex items-center gap-2 cursor-pointer @click="toggleAvailable">
      <UUatchLogo w-4 />
      <span font-bold>UUatch</span>
    </nav>
  </main>
</template>
