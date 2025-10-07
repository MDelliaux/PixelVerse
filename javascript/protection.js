
function checkAccess(requiredRole) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');

    if (isLoggedIn !== 'true') {
        alert('Vous devez être connecté pour accéder à cette page.');
        window.location.href = 'login.html';
        return;
    }

    if (requiredRole && userRole !== requiredRole) {
        alert("Vous n'avez pas l'autorisation d'accéder à cette page.");
        window.location.href = 'index.html'; // Redirection vers l'accueil
        return;
    }
}
