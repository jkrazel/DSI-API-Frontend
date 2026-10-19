let paginaActual = 1;
let solicitudActual = 0;

async function cargarDatos() {
    const solicitud = ++solicitudActual;
    const tipo = document.getElementById('resource-select').value;
    const mensaje = document.getElementById('status-message');
    const paginacion = document.getElementById('pagination');
    mensaje.textContent = 'Cargando...';
    paginacion.replaceChildren();

    try {
        const datos = await obtenerDatos(tipo, obtenerFiltros(), paginaActual);
        if (solicitud !== solicitudActual) {
            return;
        }

        renderizarResultados(tipo, datos.results);
        mensaje.textContent = `${datos.info.count} resultados encontrados.`;
        renderizarPaginacion(paginaActual, datos.info.pages);
    } catch (error) {
        if (solicitud !== solicitudActual) {
            return;
        }

        document.getElementById('results').replaceChildren();
        mensaje.textContent = error.status === 404
            ? 'No se encontraron resultados para esta búsqueda.'
            : `No se pudieron cargar los datos: ${error.message}`;
        console.error('Error al consultar la API:', error);
    }
}

document.getElementById('resource-select').addEventListener('change', () => {
    paginaActual = 1;
    renderizarFiltros(document.getElementById('resource-select').value);
    cargarDatos();
});

document.getElementById('search-form').addEventListener('submit', evento => {
    evento.preventDefault();
    paginaActual = 1;
    cargarDatos();
});

document.getElementById('clear-button').addEventListener('click', () => {
    renderizarFiltros(document.getElementById('resource-select').value);
    paginaActual = 1;
    cargarDatos();
});

document.getElementById('pagination').addEventListener('click', evento => {
    const boton = evento.target.closest('button[data-page]');
    if (!boton || boton.disabled) {
        return;
    }

    paginaActual = Number(boton.dataset.page);
    cargarDatos();
});

renderizarFiltros(document.getElementById('resource-select').value);
cargarDatos();
