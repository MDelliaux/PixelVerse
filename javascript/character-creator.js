// ../javascript/character-creator.js

document.addEventListener('DOMContentLoaded', () => {
    const creatorForm = document.getElementById('creator-form');
    const raceSelect = document.getElementById('race-select');
    const hairSelect = document.getElementById('hair-select');
    const armorSelect = document.getElementById('armor-select');
    const colorPicker = document.getElementById('color-picker');
    const previewBtn = document.getElementById('preview-btn');
    const resetBtn = document.getElementById('reset-btn');
    const saveCharacterBtn = document.getElementById('save-character-btn');

    const characterPreviewImage = document.getElementById('character-preview-image');
    const previewText = document.getElementById('preview-text');
    const previewDisplay = document.querySelector('.preview-display'); // Pour changer la couleur de fond

    const currentRace = document.getElementById('current-race');
    const currentHair = document.getElementById('current-hair');
    const currentArmor = document.getElementById('current-armor');
    const currentColor = document.getElementById('current-color');

    // Mappe les sélections à des images (simulées)
    // En réalité, tu aurais une logique plus complexe ou un API d'images
    const imageMap = {
        human: {
            short: { light: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Court+Cuir', medium: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Court+Mailles', heavy: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Court+Plaque' },
            long: { light: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Long+Cuir', medium: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Long+Mailles', heavy: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Long+Plaque' },
            braids: { light: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Tresses+Cuir', medium: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Tresses+Mailles', heavy: 'https://via.placeholder.com/400x600/6a0572/ffffff?text=Humain+Tresses+Plaque' },
        },
        elf: {
            short: { light: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Court+Cuir', medium: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Court+Mailles', heavy: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Court+Plaque' },
            long: { light: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Long+Cuir', medium: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Long+Mailles', heavy: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Long+Plaque' },
            braids: { light: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Tresses+Cuir', medium: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Tresses+Mailles', heavy: 'https://via.placeholder.com/400x600/92059a/ffffff?text=Elfe+Tresses+Plaque' },
        },
        dwarf: {
            short: { light: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Court+Cuir', medium: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Court+Mailles', heavy: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Court+Plaque' },
            long: { light: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Long+Cuir', medium: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Long+Mailles', heavy: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Long+Plaque' },
            braids: { light: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Tresses+Cuir', medium: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Tresses+Mailles', heavy: 'https://via.placeholder.com/400x600/ffa500/ffffff?text=Nain+Tresses+Plaque' },
        }
    };

    function updateCharacterPreview() {
        const selectedRace = raceSelect.value;
        const selectedHair = hairSelect.value;
        const selectedArmor = armorSelect.value;
        const selectedColor = colorPicker.value;

        // Met à jour l'image
        const imageUrl = imageMap[selectedRace]?.[selectedHair]?.[selectedArmor] || 'https://via.placeholder.com/400x600?text=Image+Non+Trouvée';
        characterPreviewImage.src = imageUrl;
        characterPreviewImage.alt = `Personnage : ${selectedRace}, ${selectedHair}, ${selectedArmor}`;
        characterPreviewImage.style.opacity = '1'; // S'assurer que l'image est visible

        // Met à jour le texte de prévisualisation (le masque si l'image est chargée)
        previewText.style.display = 'none';

        // Met à jour la couleur de fond du cadre de prévisualisation
        previewDisplay.style.backgroundColor = selectedColor;

        // Met à jour les informations du personnage actuel
        currentRace.textContent = raceSelect.options[raceSelect.selectedIndex].text;
        currentHair.textContent = hairSelect.options[hairSelect.selectedIndex].text;
        currentArmor.textContent = armorSelect.options[armorSelect.selectedIndex].text;
        currentColor.textContent = selectedColor; // Ou une version textuelle de la couleur
    }

    function resetCreator() {
        // Réinitialise les sélections par défaut
        raceSelect.value = 'human';
        hairSelect.value = 'short';
        armorSelect.value = 'light';
        colorPicker.value = '#6a0572'; // Remettre à la couleur primaire par défaut

        // Réinitialise la prévisualisation
        characterPreviewImage.src = 'https://via.placeholder.com/400x600?text=Votre+Personnage';
        characterPreviewImage.alt = 'Prévisualisation du personnage';
        characterPreviewImage.style.opacity = '1'; // Assure la visibilité
        previewText.style.display = 'block'; // Réaffiche le texte de base
        previewDisplay.style.backgroundColor = '#333'; // Réinitialise la couleur de fond

        // Réinitialise les infos du personnage actuel
        currentRace.textContent = '';
        currentHair.textContent = '';
        currentArmor.textContent = '';
        currentColor.textContent = '';
    }

    // Événement pour le bouton "Prévisualiser"
    previewBtn.addEventListener('click', updateCharacterPreview);

    // Événement pour le bouton "Réinitialiser"
    resetBtn.addEventListener('click', resetCreator);

    // Événement pour le bouton "Enregistrer Personnage"
    saveCharacterBtn.addEventListener('click', () => {
        // Enregistrement simulé : affiche une alerte avec les détails
        const characterDetails = {
            race: currentRace.textContent,
            hair: currentHair.textContent,
            armor: currentArmor.textContent,
            color: currentColor.textContent,
            image: characterPreviewImage.src
        };
        alert('Personnage enregistré !\n' +
              `Race: ${characterDetails.race}\n` +
              `Coiffure: ${characterDetails.hair}\n` +
              `Armure: ${characterDetails.armor}\n` +
              `Couleur: ${characterDetails.color}\n` +
              `Image: ${characterDetails.image}`);
        // Ici, en production, tu enverrais ces données à un serveur
    });

    // Initialisation au chargement de la page pour afficher l'état initial
    resetCreator(); // Appelle reset pour définir les valeurs initiales et l'affichage
});