const FILTROS_POR_RECURSO = {
    character: [
        { name: 'name', label: 'Nombre', type: 'search' },
        { name: 'status', label: 'Estado', options: ['Alive', 'Dead', 'unknown'] },
        { name: 'species', label: 'Especie', type: 'search' },
        { name: 'gender', label: 'Género', options: ['Female', 'Male', 'Genderless', 'unknown'] }
    ],
    location: [
        { name: 'name', label: 'Nombre', type: 'search' },
        { name: 'type', label: 'Tipo', type: 'search' },
        { name: 'dimension', label: 'Dimensión', type: 'search' }
    ],
    episode: [
        { name: 'name', label: 'Nombre', type: 'search' },
        { name: 'episode', label: 'Código del episodio', type: 'search' }
    ]
};

function renderizarFiltros(tipo) {
    const contenedor = document.getElementById('filters');
    contenedor.replaceChildren();

    FILTROS_POR_RECURSO[tipo].forEach(filtro => {
        const label = document.createElement('label');
        label.htmlFor = `filter-${filtro.name}`;
        label.textContent = filtro.label;

        let control;
        if (filtro.options) {
            control = document.createElement('select');
            const opcionInicial = document.createElement('option');
            opcionInicial.value = '';
            opcionInicial.textContent = 'Todos';
            control.appendChild(opcionInicial);

            filtro.options.forEach(valor => {
                const opcion = document.createElement('option');
                opcion.value = valor;
                opcion.textContent = valor;
                control.appendChild(opcion);
            });
        } else {
            control = document.createElement('input');
            control.type = filtro.type;
            control.placeholder = filtro.label;
        }

        control.id = `filter-${filtro.name}`;
        control.name = filtro.name;
        label.appendChild(control);
        contenedor.appendChild(label);
    });
}

function obtenerFiltros() {
    return Object.fromEntries(
        [...document.querySelectorAll('#filters [name]')]
            .map(control => [control.name, control.value.trim()])
            .filter(([, valor]) => valor)
    );
}

function agregarDetalle(contenedor, etiqueta, valor) {
    const parrafo = document.createElement('p');
    const titulo = document.createElement('strong');
    titulo.textContent = `${etiqueta}: `;
    parrafo.append(titulo, document.createTextNode(valor || 'Desconocido'));
    contenedor.appendChild(parrafo);
}

function crearTarjeta(tipo, elemento) {
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('card');

    if (tipo === 'character') {
        const imagen = document.createElement('img');
        imagen.src = elemento.image;
        imagen.alt = `Imagen de ${elemento.name}`;
        tarjeta.appendChild(imagen);
    }

    const contenido = document.createElement('div');
    contenido.classList.add('card-info');
    const titulo = document.createElement('h2');
    titulo.textContent = elemento.name;
    contenido.appendChild(titulo);

    if (tipo === 'character') {
        agregarDetalle(contenido, 'Estado', elemento.status);
        agregarDetalle(contenido, 'Especie', elemento.species);
        agregarDetalle(contenido, 'Género', elemento.gender);
        agregarDetalle(contenido, 'Origen', elemento.origin.name);
    } else if (tipo === 'location') {
        agregarDetalle(contenido, 'Tipo', elemento.type);
        agregarDetalle(contenido, 'Dimensión', elemento.dimension);
        agregarDetalle(contenido, 'Residentes', elemento.residents.length);
    } else {
        agregarDetalle(contenido, 'Código', elemento.episode);
        agregarDetalle(contenido, 'Fecha de emisión', elemento.air_date);
        agregarDetalle(contenido, 'Personajes', elemento.characters.length);
    }

    tarjeta.appendChild(contenido);
    return tarjeta;
}

function renderizarResultados(tipo, elementos) {
    const resultados = document.getElementById('results');
    resultados.replaceChildren();

    const grid = document.createElement('div');
    grid.classList.add('grid-container');
    elementos.forEach(elemento => grid.appendChild(crearTarjeta(tipo, elemento)));
    resultados.appendChild(grid);
}

function renderizarPaginacion(pagina, totalPaginas) {
    const paginacion = document.getElementById('pagination');
    paginacion.replaceChildren();

    if (totalPaginas <= 1) {
        return;
    }

    const anterior = document.createElement('button');
    anterior.type = 'button';
    anterior.textContent = 'Anterior';
    anterior.dataset.page = pagina - 1;
    anterior.disabled = pagina === 1;

    const indicador = document.createElement('span');
    indicador.textContent = `Página ${pagina} de ${totalPaginas}`;

    const siguiente = document.createElement('button');
    siguiente.type = 'button';
    siguiente.textContent = 'Siguiente';
    siguiente.dataset.page = pagina + 1;
    siguiente.disabled = pagina === totalPaginas;

    paginacion.append(anterior, indicador, siguiente);
}
