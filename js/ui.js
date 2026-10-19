function renderizarPersonajes(personajes) {
    const app = document.getElementById('app');

    app.innerHTML = '';

    const grid = document.createElement('div');
    grid.classList.add('grid-container');

    personajes.forEach(personaje => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${personaje.image}" alt="Imagen de ${personaje.name}">
            <div class="card-info">
                <h2>${personaje.name}</h2>
                <p><strong>Estado:</strong> ${personaje.status}</p>
                <p><strong>Especie:</strong> ${personaje.species}</p>
            </div>
        `;

        grid.appendChild(card);
    });

    app.appendChild(grid);
}