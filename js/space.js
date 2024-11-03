const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');


btnBuscar.addEventListener('click', () => {
    const query = inputBuscar.value.trim();

    if (query === '') {
        alert('Por favor, ingrese un término de búsqueda.');
        return;
    }

    // Realizamos la solicitud a la API de la NASA
    const apiUrl = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            mostrarResultados(data.collection.items);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
});

// Función para mostrar los resultados de la búsqueda
function mostrarResultados(items) {
    contenedor.innerHTML = ''; // Limpiamos los resultados anteriores

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
        return;
    }

    // Crear fila para agrupar las tarjetas
    const row = document.createElement('div');
    row.classList.add('row', 'g-3');

    // Recorremos los items y desestructuramos los datos para mostrar en tarjetas
    items.forEach(item => {
        const { title, description, date_created } = item.data[0]; // Desestructuración de objeto
        const imageUrl = item.links[0].href;

        // Crear una tarjeta para cada imagen
        const col = document.createElement('div');
        col.classList.add('col-md-4'); // Cada tarjeta ocupa 1/3 de la fila

        col.innerHTML = `
            <div class="card h-100">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${title || 'Sin título'}</h5>
                    <div class="card-text overflow-auto" style="max-height: 100px;">
                        ${description || 'Sin descripción disponible'}
                    </div>
                    <p class="mt-auto text-muted"><small>Fecha: ${date_created.split('T')[0] || 'No disponible'}</small></p>
                </div>
            </div>
        `;

        row.appendChild(col);
    });

    contenedor.appendChild(row); // Añadimos la fila al contenedor principal
}
