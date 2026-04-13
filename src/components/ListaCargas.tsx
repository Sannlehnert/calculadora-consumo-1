import type { Carga } from '../App'

interface Props {
  cargas: Carga[]
}

function ListaCargas({ cargas }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-green-700 mb-3">
        Cargas registradas{' '}
        <span className="text-sm bg-gray-200 px-2 py-1 rounded">{cargas.length}</span>
      </h2>
      <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto border border-gray-200">
        {cargas.length === 0 ? (
          <p className="text-gray-400 text-center py-4">Todavia no hay cargas. Agrega la primera.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cargas.map((carga, idx) => (
              <li key={idx} className="py-2 flex justify-between hover:bg-gray-100 px-2 rounded">
                <span>Carga {idx + 1}</span>
                <span>{carga.km} km</span>
                <span>{carga.litros} L</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ListaCargas