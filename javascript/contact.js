document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const pseudoInput = document.getElementById('pseudo');
    const pseudoFeedback = document.getElementById('pseudo-feedback');
    const formMessage = document.getElementById('form-message');
    const consentCheckbox = document.getElementById('consent');

    // ==============================================
    // 1. Pré-remplir les champs si l'utilisateur est connecté
    // ==============================================
    function prefillFormIfLoggedIn() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userPseudo = localStorage.getItem('userPseudo'); // Pseudo stocké au login
        const userEmail = localStorage.getItem('userEmail'); // Email stocké au login (on ajoutera ça plus tard lors du login réel)

        if (isLoggedIn) {
            if (userEmail) {
                emailInput.value = userEmail;
                emailInput.readOnly = true; // Empêche la modification de l'email
                emailInput.style.backgroundColor = '#e9e9e9'; // Indique visuellement que c'est en lecture seule
            }
            if (userPseudo) {
                pseudoInput.value = userPseudo;
                pseudoInput.readOnly = true; // Empêche la modification du pseudo
                pseudoInput.style.backgroundColor = '#e9e9e9';
            }
        } else {
            emailInput.readOnly = false;
            pseudoInput.readOnly = false;
            emailInput.style.backgroundColor = '';
            pseudoInput.style.backgroundColor = '';
        }
    }

    prefillFormIfLoggedIn(); // Appelle la fonction au chargement de la page

    // ==============================================
    // 2. Vérification de l'existence du Pseudo (Côté Client - Simulation)
    // ==============================================
    // En production, cette vérification se ferait via une requête AJAX au back-end
    async function checkPseudoExists(pseudo) {
        // Simulation d'une requête API
        console.log(`Vérification du pseudo: ${pseudo}`);
        return new Promise(resolve => {
            setTimeout(() => {
                // Pour l'exemple, on considère que 'admin' et 'testuser' existent déjà
                const existingPseudos = ['admin', 'testuser', 'joseleboss'];
                const exists = existingPseudos.includes(pseudo.toLowerCase());
                resolve(exists);
            }, 500); // Délai pour simuler une requête réseau
        });
    }

    let pseudoCheckTimeout; // Pour éviter des vérifications trop fréquentes

    pseudoInput.addEventListener('input', () => {
        clearTimeout(pseudoCheckTimeout);
        pseudoFeedback.style.display = 'none'; // Cache les anciens messages

        const currentPseudo = pseudoInput.value.trim();

        if (currentPseudo.length > 0 && !pseudoInput.readOnly) { // Ne vérifie que si non pré-rempli
            pseudoFeedback.className = 'feedback-message'; // Reset classes
            pseudoFeedback.textContent = 'Vérification en cours...';
            pseudoFeedback.style.display = 'block';

            pseudoCheckTimeout = setTimeout(async () => {
                const exists = await checkPseudoExists(currentPseudo);
                if (exists) {
                    pseudoFeedback.classList.add('error');
                    pseudoFeedback.textContent = `Le pseudo "${currentPseudo}" existe déjà.`;
                } else {
                    pseudoFeedback.classList.add('success');
                    pseudoFeedback.textContent = `Le pseudo "${currentPseudo}" est disponible.`;
                }
            }, 700); // Attendre un peu avant de vérifier
        } else if (currentPseudo.length === 0) {
            pseudoFeedback.style.display = 'none';
        }
    });


    // ==============================================
    // 3. Gestion de la soumission du formulaire
    // ==============================================
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        formMessage.style.display = 'none'; // Cache les messages précédents
        formMessage.classList.remove('success', 'error');

        // Validation client-side additionnelle (HTML5 'required' fait déjà une partie du travail)
        if (!consentCheckbox.checked) {
            formMessage.classList.add('error');
            formMessage.textContent = "Vous devez accepter la politique de confidentialité.";
            formMessage.style.display = 'block';
            return;
        }

        // Vérifier si le pseudo est valide si l'utilisateur l'a entré lui-même
        if (!pseudoInput.readOnly) {
            const pseudoExists = await checkPseudoExists(pseudoInput.value.trim());
            if (pseudoExists) {
                pseudoFeedback.classList.add('error');
                pseudoFeedback.textContent = `Le pseudo "${pseudoInput.value.trim()}" existe déjà. Veuillez en choisir un autre.`;
                pseudoFeedback.style.display = 'block';
                formMessage.classList.add('error');
                formMessage.textContent = "Veuillez corriger les erreurs du formulaire.";
                formMessage.style.display = 'block';
                return;
            }
        }
        
        // --- Ici, on enverrait les données au back-end ---
        // Simulation d'une requête API POST
            try {
                // const response = await fetch('/api/contact', { // Endpoint API à créer sur le back-end
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         email: emailInput.value,
                //         pseudo: pseudoInput.value,
                //         subject: document.getElementById('subject').value,
                //         message: document.getElementById('message').value
                //     })
                // });

                // const data = await response.json(); // Récupérer la réponse du serveur

                // Simulation d'une réponse réussie
                const simulationSuccess = true; // Remplacez par une vraie vérification de la réponse.
                if (simulationSuccess) { // if (response.ok) { ... }
                    formMessage.classList.add('success');
                    formMessage.textContent = 'Votre demande a été envoyée avec succès ! Nous vous répondrons bientôt.';
                    contactForm.reset(); // Réinitialise le formulaire après envoi
                    pseudoFeedback.style.display = 'none'; // Cache le feedback du pseudo
                    if (emailInput.readOnly) emailInput.style.backgroundColor = '#e9e9e9'; // Garde le champ en lecture seule si pré-rempli
                    if (pseudoInput.readOnly) pseudoInput.style.backgroundColor = '#e9e9e9';
                } else {
                    // Gérer les erreurs de l'API (e.g., validation côté serveur)
                    formMessage.classList.add('error');
                    formMessage.textContent = 'Une erreur est survenue lors de l\'envoi de votre demande.'; // Message générique pour la simulation
                }
            } catch (error) {
                console.error('Erreur réseau ou du serveur:', error);
                formMessage.classList.add('error');
                formMessage.textContent = 'Problème de connexion. Veuillez réessayer plus tard.';
            } finally {
                formMessage.style.display = 'block'; // Affiche le message de succès ou d'erreur
            }
          
    });
});
