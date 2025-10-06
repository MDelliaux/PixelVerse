document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('auth-link');
    const authLinkAnchor = authLink.querySelector('a');

    // Fonction pour vérifier l'état de connexion (simulé pour l'instant)
    function checkLoginStatus() {
        // En production, cette information viendrait du serveur (e.g., via un cookie ou un token JWT)
        // Pour l'exemple, on utilise localStorage pour simuler
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userPseudo = localStorage.getItem('userPseudo');

        if (isLoggedIn) {
            authLinkAnchor.innerHTML = `<i class="fas fa-sign-out-alt"></i> Déconnexion (${userPseudo})`;
            authLinkAnchor.href = '#'; // Le lien sera géré par JavaScript pour la déconnexion
            authLinkAnchor.addEventListener('click', handleLogout);
        } else {
            authLinkAnchor.innerHTML = `<i class="fas fa-sign-in-alt"></i> Connexion`;
            authLinkAnchor.href = 'login.html';
            authLinkAnchor.removeEventListener('click', handleLogout); // S'assurer que l'event listener est retiré si déconnecté
        }
    }

    // Fonction de gestion de la déconnexion
    function handleLogout(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
        
        // Supprime les informations de connexion du localStorage (simulation)
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userPseudo');

        // En production, ici on ferait une requête API au back-end pour invalider la session/token
        console.log("Déconnexion simulée.");

        // Met à jour l'interface utilisateur
        checkLoginStatus();
        
        // Redirige vers la page d'accueil ou de connexion
        window.location.href = 'index.html'; 
    }

    // Initialise l'état de connexion au chargement de la page
    checkLoginStatus();

    // Pour simuler la connexion (à utiliser dans la console du navigateur)
    // localStorage.setItem('isLoggedIn', 'true');
    // localStorage.setItem('userPseudo', 'MonPseudoCool');
    // location.reload(); // Recharger la page après simulation pour voir le changement

    // Pour simuler la déconnexion (à utiliser dans la console du navigateur)
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('userPseudo');
    // location.reload();

});