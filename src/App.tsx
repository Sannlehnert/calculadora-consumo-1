import { useState } from 'react'
import FormularioCarga from './components/FormularioCarga'
import ListaCargas from './components/ListaCargas'
import ResultadoViaje from './components/ResultadoViaje'

export type Carga = {
  km: number
  litros: number
}

function App() {
  const [cargas, setCargas] = useState<Carga[]>([])
  const [kmInicial, setKmInicial] = useState<number | null>(null)
  const [resultadoHtml, setResultadoHtml] = useState<string>('')

  const agregarCarga = (km: number, litros: number) => {
    // Si es la primera carga, guardamos el km inicial
    if (cargas.length === 0) {
      setKmInicial(km)
      setCargas([{ km, litros }])
    } else {
      // Para las siguientes, verificamos que el km sea mayor al último
      const ultimoKm = cargas[cargas.length - 1].km
      if (km <= ultimoKm) {
        alert(`El km actual (${km}) debe ser mayor al último registrado (${ultimoKm}). No podes retroceder.`)
        return
      }
      setCargas([...cargas, { km, litros }])
    }
    setResultadoHtml('')
  }

  const finalizarViaje = () => {
    if (cargas.length === 0) {
      alert('No hay cargas registradas. Agrega al menos una.')
      return
    }

    const kmInicialReal = kmInicial !== null ? kmInicial : cargas[0].km
    const kmFinal = cargas[cargas.length - 1].km
    const distanciaTotal = kmFinal - kmInicialReal

    if (distanciaTotal <= 0) {
      alert('Error: distancia invalida. Revisa los kms.')
      return
    }

    let totalLitros = 0
    for (let i = 0; i < cargas.length; i++) {
      totalLitros += cargas[i].litros
    }

    const consumo = (totalLitros / distanciaTotal) * 100
    const consumoFormateado = consumo.toFixed(2)

    const html = `
      <div class="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
        <p class="font-semibold text-green-700">Viaje finalizado</p>
        <p class="text-sm">Kilometro inicial: <strong>${kmInicialReal} km</strong></p>
        <p class="text-sm">Kilometro final: <strong>${kmFinal} km</strong></p>
        <p class="text-sm">Distancia total: <strong>${distanciaTotal.toFixed(1)} km</strong></p>
        <p class="text-sm">Litros totales: <strong>${totalLitros.toFixed(2)} L</strong></p>
        <p class="text-lg font-bold text-green-700 mt-1">Consumo promedio: ${consumoFormateado} L/100km</p>
      </div>
    `
    setResultadoHtml(html)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-green-700">Calculadora de Nafta</h1>
          <p className="text-gray-500 mt-1">Registra las cargas de tu viaje</p>
        </div>

        <FormularioCarga
          onAgregarCarga={agregarCarga}
          hayCargas={cargas.length > 0}
          ultimoKm={cargas.length > 0 ? cargas[cargas.length - 1].km : undefined}
        />

        <ListaCargas cargas={cargas} />

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            onClick={finalizarViaje}
            className="w-full sm:w-auto bg-amber-400 text-gray-800 font-medium py-2 px-6 rounded-lg hover:bg-amber-500 transition duration-200 shadow-sm"
          >
            Finalizar viaje y calcular
          </button>
          <ResultadoViaje html={resultadoHtml} />
        </div>
      </div>
    </div>
  )
}

export default App