<script setup lang="ts">
import { ref } from 'vue'

// Props que recibe el componente
const props = defineProps<{
  hayCargas: boolean
  ultimoKm?: number
}>()

// Evento que emite al agregar una carga
const emit = defineEmits<{
  agregarCarga: [km: number, litros: number]
}>()

// Campos del formulario
const kmActual = ref<string>('')
const litrosCarga = ref<string>('')

// Se ejecuta al enviar el form
const manejarSubmit = () => {
  const km = parseFloat(kmActual.value)
  const litros = parseFloat(litrosCarga.value)

  if (isNaN(km) || isNaN(litros)) {
    alert('Ingresá números válidos en los campos.')
    return
  }
  if (km <= 0) {
    alert('El kilometraje tiene que ser mayor a cero.')
    return
  }
  if (litros <= 0) {
    alert('Los litros tienen que ser positivos.')
    return
  }

  // Validar que el km sea mayor al ultimo registrado si ya hay cargas
  if (props.hayCargas && props.ultimoKm !== undefined && km <= props.ultimoKm) {
    alert(`El kilometraje actual (${km}) debe ser mayor al último registrado (${props.ultimoKm}).`)
    return
  }

  emit('agregarCarga', km, litros)
  kmActual.value = ''
  litrosCarga.value = ''
}
</script>

<template>
  <div class="bg-amber-50 p-5 rounded-xl mb-6">
    <h2 class="text-xl font-semibold text-green-700 mb-4">Registrar nueva carga</h2>
    <form @submit.prevent="manejarSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kilometraje actual (km)</label>
          <input
            type="number"
            v-model="kmActual"
            :placeholder="hayCargas ? `Debe ser mayor a ${ultimoKm}` : 'Ej: 12500'"
            step="0.1"
            class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500"
            required
          />
          <p v-if="hayCargas" class="text-xs text-gray-500 mt-1">
            El kilometraje debe ser mayor al último registro ({{ ultimoKm }})
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Litros cargados (L)</label>
          <input
            type="number"
            v-model="litrosCarga"
            placeholder="Ej: 45.5"
            step="0.01"
            class="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200 shadow-sm"
      >
        Agregar carga
      </button>
    </form>
  </div>
</template>