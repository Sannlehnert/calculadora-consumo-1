import { useState } from 'react'

interface Props {
  onAgregarCarga: (km: number, litros: number) => void
  hayCargas: boolean       // si ya hay al menos una carga
  ultimoKm?: number        // el ultimo km registrado
}

function FormularioCarga({ onAgregarCarga, hayCargas, ultimoKm }: Props) {
  const [kmActual, setKmActual] = useState<string>('')
  const [litrosCarga, setLitrosCarga] = useState<string>('')

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const km = parseFloat(kmActual)
    const litros = parseFloat(litrosCarga)

    if (isNaN(km) || isNaN(litros)) {
      alert('Ingresa numeros validos en los campos.')
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

    // Si ya hay cargas, validar que el km sea mayor al ultimo
    if (hayCargas && ultimoKm !== undefined && km <= ultimoKm) {
      alert(`El kilometraje actual (${km}) debe ser mayor al ultimo registrado (${ultimoKm}).`)
      return
    }

    onAgregarCarga(km, litros)
    setKmActual('')
    setLitrosCarga('')
  }

  return (
    <div className="bg-amber-50 p-5 rounded-xl mb-6">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Registrar nueva carga</h2>
      <form onSubmit={manejarSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje actual (km)</label>
            <input
              type="number"
              value={kmActual}
              onChange={(e) => setKmActual(e.target.value)}
              placeholder={hayCargas ? `Debe ser mayor a ${ultimoKm}` : "Ej: 12500"}
              step="0.1"
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500"
              required
              disabled={false} // No lo deshabilitamos, pero la validacion lo controla
            />
            {hayCargas && (
              <p className="text-xs text-gray-500 mt-1">El kilometraje debe ser mayor al ultimo registro ({ultimoKm})</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Litros cargados (L)</label>
            <input
              type="number"
              value={litrosCarga}
              onChange={(e) => setLitrosCarga(e.target.value)}
              placeholder="Ej: 45.5"
              step="0.01"
              className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200 shadow-sm"
        >
          Agregar carga
        </button>
      </form>
    </div>
  )
}

export default FormularioCarga