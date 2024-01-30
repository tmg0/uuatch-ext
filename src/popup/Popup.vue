<script setup lang="ts">
import { version } from '../../package.json'

const { isAvailable, watches } = useStore()

const toggleAvailable = () => { isAvailable.value = !isAvailable.value }
</script>

<template>
  <main w="300px" py-2 text-gray-700>
    <nav
      px-4
      py-3
      flex
      items-center
      justify-between
      w-full
      cursor-pointer
      hover:bg-gray-100
      @click="toggleAvailable"
    >
      <div flex items-center gap-2>
        <UUatchLogo w-4 :disabled="!isAvailable" />
        <span font-bold select-none :class="{ 'text-gray-300': !isAvailable }">UUatch</span>
      </div>
      <span scale-75>v{{ version }}</span>
    </nav>

    <div>
      {{ watches }}
    </div>
  </main>
</template>
