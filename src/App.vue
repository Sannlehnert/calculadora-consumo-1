<script setup lang="ts">
import { ref } from 'vue'
import FormularioCarga from './components/FormularioCarga.vue'
import ListaCargas from './components/ListaCargas.vue'
import ResultadoViaje from './components/ResultadoViaje.vue'

// Tipado para una carga
interface Carga {
  km: number
  litros: number
}

// Estados
const cargas = ref<Carga[]>([])
const kmInicial = ref<number | null>(null)
const resultadoHtml = ref<string>('')

// Agrega una nueva carga al listado
const agregarCarga = (km: number, litros: number) => {
  if (cargas.value.length === 0) {
    kmInicial.value = km
    cargas.value = [{ km, litros }]
  } else {
    const ultimoKm = cargas.value[cargas.value.length - 1].km
    if (km <= ultimoKm) {
      alert(`El km actual (${km}) debe ser mayor al último registrado (${ultimoKm}). No podés retroceder.`)
      return
    }
    cargas.value = [...cargas.value, { km, litros }]
  }
  resultadoHtml.value = ''
}

// Calcula el consumo y muestra el resultado
const finalizarViaje = () => {
  if (cargas.value.length === 0) {
    alert('No hay cargas registradas. Agregá al menos una.')
    return
  }

  const kmInicialReal = kmInicial.value !== null ? kmInicial.value : cargas.value[0].km
  const kmFinal = cargas.value[cargas.value.length - 1].km
  const distanciaTotal = kmFinal - kmInicialReal

  if (distanciaTotal <= 0) {
    alert('Error: distancia inválida. Revisá los kms.')
    return
  }

  let totalLitros = 0
  for (let i = 0; i < cargas.value.length; i++) {
    totalLitros += cargas.value[i].litros
  }

  const consumo = (totalLitros / distanciaTotal) * 100
  const consumoFormateado = consumo.toFixed(2)

  resultadoHtml.value = `
    <div class="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
      <p class="font-semibold text-green-700">Viaje finalizado</p>
      <p class="text-sm">Kilómetro inicial: <strong>${kmInicialReal} km</strong></p>
      <p class="text-sm">Kilómetro final: <strong>${kmFinal} km</strong></p>
      <p class="text-sm">Distancia total: <strong>${distanciaTotal.toFixed(1)} km</strong></p>
      <p class="text-sm">Litros totales: <strong>${totalLitros.toFixed(2)} L</strong></p>
      <p class="text-lg font-bold text-green-700 mt-1">Consumo promedio: ${consumoFormateado} L/100km</p>
    </div>
  `
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
    <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">

      <div class="text-center mb-8">
        <h1 class="text-3xl font-semibold text-green-700">Calculadora de Nafta</h1>
        <p class="text-gray-500 mt-1">Registrá las cargas de tu viaje</p>
      </div>

      <FormularioCarga
        @agregar-carga="agregarCarga"
        :hay-cargas="cargas.length > 0"
        :ultimo-km="cargas.length > 0 ? cargas[cargas.length - 1].km : undefined"
      />

      <ListaCargas :cargas="cargas" />

      <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <button
          @click="finalizarViaje"
          class="w-full sm:w-auto bg-amber-400 text-gray-800 font-medium py-2 px-6 rounded-lg hover:bg-amber-500 transition duration-200 shadow-sm"
        >
          Finalizar viaje y calcular
        </button>
        <ResultadoViaje :html="resultadoHtml" />
      </div>
    </div>
  </div>
</template>