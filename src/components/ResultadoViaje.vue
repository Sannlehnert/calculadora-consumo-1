<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<template>
  <div
    v-if="html"
    class="text-sm text-gray-500 italic"
    v-html="html"
  />
</template>