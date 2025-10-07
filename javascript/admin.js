// Fichier javascript pour la page d'administration

document.addEventListener('DOMContentLoaded', function() {
    // Simuler la récupération de données. Dans une vraie application, ces données viendraient d'une API.
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com', role: 'user' },
        { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'admin' }
    ];

    const characters = [
        { id: 101, name: 'Elarra', owner: 'Alice' },
        { id: 102, name: 'Kael', owner: 'Bob' },
        { id: 103, name: 'Lyra', owner: 'Alice' }
    ];

    const usersList = document.getElementById('users-list');
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('admin-item');
        userElement.innerHTML = `
            <p><strong>${user.name}</strong> (${user.email}) - Rôle: ${user.role}</p>
            <button onclick="editUser(${user.id})">Modifier</button>
            <button onclick="deleteUser(${user.id})">Supprimer</button>
        `;
        usersList.appendChild(userElement);
    });

    const charactersList = document.getElementById('characters-list');
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.classList.add('admin-item');
        characterElement.innerHTML = `
            <p><strong>${character.name}</strong> (Propriétaire: ${character.owner})</p>
            <button onclick="editCharacter(${character.id})">Modifier</button>
            <button onclick="deleteCharacter(${character.id})">Supprimer</button>
        `;
        charactersList.appendChild(characterElement);
    });
});

function editUser(id) {
    alert(`Modification de l'utilisateur avec l'ID : ${id}`);
    // Logique de modification à implémenter
}

function deleteUser(id) {
    if (confirm(`Voulez-vous vraiment supprimer l'utilisateur avec l'ID : ${id} ?`)) {
        alert(`Utilisateur ${id} supprimé.`);
        // Logique de suppression à implémenter
    }
}

function editCharacter(id) {
    alert(`Modification du personnage avec l'ID : ${id}`);
    // Logique de modification à implémenter
}

function deleteCharacter(id) {
    if (confirm(`Voulez-vous vraiment supprimer le personnage avec l'ID : ${id} ?`)) {
        alert(`Personnage ${id} supprimé.`);
        // Logique de suppression à implémenter
    }
}
