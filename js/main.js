async function iniciarApp() {
    console.log("Iniciando la aplicación...");

    const datos = await obtenerPersonajes();

    if (datos && datos.results) {
        renderizarPersonajes(datos.results);
    } else {
        console.error("No se pudieron cargar los personajes.");
    }
}

iniciarApp();