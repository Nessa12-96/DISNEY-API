document.addEventListener('DOMContentLoaded', () => {
    const charactersList = document.getElementById('characters-list');
    const addCharacterBtn = document.getElementById('add-character-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const addCharacterForm = document.getElementById('add-character-form');

    // Fetch characters from API and display
    fetch('/api/characters')
        .then(response => response.json())
        .then(data => {
            data.forEach(character => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>${character.name}</strong> - ${character.firstAppearance}`;
                charactersList.appendChild(div);
            });
        });

    // Open modal
    addCharacterBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Add new character
    addCharacterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const firstAppearance = document.getElementById('firstAppearance').value;

        fetch('/api/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, firstAppearance })
        })
        .then(response => response.json())
        .then(character => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${character.name}</strong> - ${character.firstAppearance}`;
            charactersList.appendChild(div);
            modal.style.display = 'none';
            addCharacterForm.reset();
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});

