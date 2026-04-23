<script setup lang="ts">
interface Carga {
  km: number
  litros: number
}

defineProps<{
  cargas: Carga[]
}>()
</script>

<template>
  <div class="mb-6">
    <h2 class="text-xl font-semibold text-green-700 mb-3">
      Cargas registradas
      <span class="text-sm bg-gray-200 px-2 py-1 rounded">{{ cargas.length }}</span>
    </h2>
    <div class="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto border border-gray-200">
      <p v-if="cargas.length === 0" class="text-gray-400 text-center py-4">
        Todavía no hay cargas. Agregá la primera.
      </p>
      <ul v-else class="divide-y divide-gray-200">
        <li
          v-for="(carga, idx) in cargas"
          :key="idx"
          class="py-2 flex justify-between hover:bg-gray-100 px-2 rounded"
        >
          <span>Carga {{ idx + 1 }}</span>
          <span>{{ carga.km }} km</span>
          <span>{{ carga.litros }} L</span>
        </li>
      </ul>
    </div>
  </div>
</template>