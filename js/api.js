const API_URL = 'https://rickandmortyapi.com/api';

async function obtenerPersonajes() {
    try {
        const respuesta = await fetch(`${API_URL}/character`);
        const datos = await respuesta.json();
        console.log("Conexión exitosa. Datos recibidos:", datos);
        return datos;
    } catch (error) {
        console.error("Error al conectar con la API:", error);
    }
}
