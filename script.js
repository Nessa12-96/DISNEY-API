fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const charactersContainer = document.getElementById('characters');
        data.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character');
            characterDiv.innerHTML = `
                <img src="${character.imageUrl}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p>First Appearance: ${character.firstAppearance}</p>
            `;
            charactersContainer.appendChild(characterDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
