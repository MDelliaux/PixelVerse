// ../javascript/characters.js

document.addEventListener('DOMContentLoaded', () => {
    // FORCE LA MODALE À ÊTRE CACHÉE AU CHARGEMENT
    
    // 1. Sélection des éléments de la modale
    const characterModal = document.getElementById('characterModal');
     if (characterModal) {
        characterModal.style.display = 'none';}
    const closeButton = document.querySelector('.close-button');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn'); // Tous les boutons "Voir Profil"

    // Éléments pour afficher les détails du personnage dans la modale
    const modalCharacterImage = document.getElementById('modal-character-image');
    const modalCharacterName = document.getElementById('modal-character-name');
    const modalCharacterDescription = document.getElementById('modal-character-description');
    const modalCharacterClass = document.getElementById('modal-character-class');
    const modalCharacterWeapon = document.getElementById('modal-character-weapon');
    const modalCharacterSpecialty = document.getElementById('modal-character-specialty');

    // 2. Fonction pour ouvrir la modale
    function openModal(characterData) {
        // Remplir la modale avec les données du personnage
        modalCharacterImage.src = characterData.image;
        modalCharacterImage.alt = characterData.name;
        modalCharacterName.textContent = characterData.name;
        modalCharacterDescription.textContent = characterData.description;
        modalCharacterClass.textContent = characterData.class;
        modalCharacterWeapon.textContent = characterData.weapon;
        modalCharacterSpecialty.textContent = characterData.specialty;

        characterModal.style.display = 'flex'; // Affiche la modale (grâce au CSS flex pour le centrage)
        document.body.style.overflow = 'hidden'; // Empêche le défilement du corps de la page
    }

    // 3. Fonction pour fermer la modale
    function closeModal() {
        characterModal.style.display = 'none'; // Cache la modale
        document.body.style.overflow = 'auto'; // Réactive le défilement du corps de la page
    }

    // 4. Écouteurs d'événements pour les boutons "Voir Profil"
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const data = event.currentTarget.dataset; // Récupère tous les data-attributs du bouton
            
            const characterData = {
                name: data.name,
                image: data.image,
                description: data.description,
                class: data.class,
                weapon: data.weapon,
                specialty: data.specialty
            };
            
            openModal(characterData);
        });
    });

    // 5. Écouteurs d'événements pour le bouton de fermeture de la modale
    closeButton.addEventListener('click', closeModal);

    // 6. Fermer la modale si l'utilisateur clique en dehors de son contenu
    characterModal.addEventListener('click', (event) => {
        if (event.target === characterModal) {
            closeModal();
        }
    });

    // 7. Fermer la modale avec la touche Échap
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && characterModal.style.display === 'flex') {
            closeModal();
        }
    });
});