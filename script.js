// Array para guardar las cargas del viaje
let cargas = [];

// Elementos del DOM
const kmActualInput = document.getElementById('km-actual');
const litrosCargaInput = document.getElementById('litros-carga');
const btnAgregar = document.getElementById('btn-agregar');
const btnFinalizar = document.getElementById('btn-finalizar');
const listaCargasDiv = document.getElementById('lista-cargas');
const contadorSpan = document.getElementById('contador-cargas');
const resultadoFinalDiv = document.getElementById('resultado-final');

// Actualizar la lista visual
function actualizarLista() {
    if (cargas.length === 0) {
        listaCargasDiv.innerHTML = '<p class="text-gray-400 text-center py-4">Todavía no hay cargas. Agregá la primera.</p>';
        contadorSpan.textContent = '0';
        return;
    }

    let html = '<ul class="divide-y divide-gray-200">';
    let i = 0;
    cargas.forEach((carga) => {
        i++;
        html += `
            <li class="py-2 flex justify-between">
                <span>Carga ${i}</span>
                <span> ${carga.km} km</span>
                <span> ${carga.litros} L</span>
            </li>
        `;
    });
    html += '</ul>';
    listaCargasDiv.innerHTML = html;
    contadorSpan.textContent = cargas.length;
}

// Agregar una carga
function agregarCarga() {
    const km = parseFloat(kmActualInput.value);
    const litros = parseFloat(litrosCargaInput.value);

    if (isNaN(km) || isNaN(litros)) {
        alert("Debe poner numeros validos en ambos campos.");
        return;
    }
    if (km <= 0) {
        alert("El kilometraje tiene que ser mayor a cero.");
        return;
    }
    if (litros <= 0) {
        alert("Litros no pueden ser negativos.");
        return;
    }

    // Guardar
    cargas.push({ km: km, litros: litros });

    // Limpiar inputs
    kmActualInput.value = '';
    litrosCargaInput.value = '';

    actualizarLista();
    resultadoFinalDiv.innerHTML = ''; // limpiar resultado anterior
}

//Consumo promedio L/100km
function finalizarViaje() {
    if (cargas.length === 0) {
        alert('No hay cargas registradas. Agrega al menos una.');
        return;
    }

    const kmInicial = cargas[0].km;     // primer km del viaje
    const kmFinal = cargas[cargas.length - 1].km;  // último km
    const distanciaTotal = kmFinal - kmInicial;

    if (distanciaTotal <= 0) {
        alert("Error: distancia invalida. Revisa los kms.");
        return;
    }

    let totalLitros = 0;
    for (let i = 0; i < cargas.length; i++) {  // sumo todos los litros del array
        totalLitros += cargas[i].litros;
    }

    const consumo = (totalLitros / distanciaTotal) * 100;  // fórmula L/100km
    const consumoFormateado = consumo.toFixed(2);

    resultadoFinalDiv.innerHTML = `
        <div class="bg-green-50 p-3 rounded-lg border border-ecoGreen/30 text-center">
            <p class="font-semibold text-ecoGreen">Viaje finalizado</p>
            <p class="text-sm">Distancia total: <strong>${distanciaTotal.toFixed(1)} km</strong></p>
            <p class="text-sm">Litros totales: <strong>${totalLitros.toFixed(2)} L</strong></p>
            <p class="text-md font-bold text-ecoGreen mt-1">Consumo promedio: ${consumoFormateado} L/100km</p>
        </div>
    `;
}

// Eventos
btnAgregar.addEventListener('click', agregarCarga);
btnFinalizar.addEventListener('click', finalizarViaje);