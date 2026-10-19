const API_URL = 'https://rickandmortyapi.com/api';

async function obtenerDatos(tipo, filtros = {}, pagina = 1) {
    const parametros = new URLSearchParams({ page: pagina });

    Object.entries(filtros).forEach(([clave, valor]) => {
        if (valor) {
            parametros.set(clave, valor);
        }
    });

    const respuesta = await fetch(`${API_URL}/${tipo}?${parametros}`);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
        const error = new Error(datos.error || `Error HTTP ${respuesta.status}`);
        error.status = respuesta.status;
        throw error;
    }

    return datos;
}
