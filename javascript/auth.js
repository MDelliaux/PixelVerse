document.addEventListener('DOMContentLoaded', () => {
    // Références aux formulaires et messages
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');
    const forgotPasswordMessage = document.getElementById('forgot-password-message');

    // Références pour le formulaire d'inscription
    const signupEmailInput = document.getElementById('signup-email');
    const signupPseudoInput = document.getElementById('signup-pseudo');
    const signupPasswordInput = document.getElementById('signup-password');
    const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
    const signupConsentCheckbox = document.getElementById('signup-consent');

    const emailFeedback = document.getElementById('email-feedback');
    const pseudoSignupFeedback = document.getElementById('pseudo-signup-feedback');
    const passwordFeedback = document.getElementById('password-feedback');
    const confirmPasswordFeedback = document.getElementById('confirm-password-feedback');

    // Indicateur de force du mot de passe (si implémenté)
    const passwordStrengthIndicator = document.createElement('div');
    passwordStrengthIndicator.className = 'password-strength-indicator';
    const passwordStrengthBar = document.createElement('div');
    passwordStrengthIndicator.appendChild(passwordStrengthBar);
    if (signupPasswordInput) {
        signupPasswordInput.parentNode.insertBefore(passwordStrengthIndicator, passwordFeedback);
    }

    // ==============================================
    // Fonctions utilitaires pour le feedback
    // ==============================================
    function showFeedback(element, message, type = 'error') {
        element.textContent = message;
        element.className = `feedback-message ${type}`;
        element.style.display = 'block';
    }

    function hideFeedback(element) {
        element.style.display = 'none';
        element.textContent = '';
        element.className = 'feedback-message'; // Reset classes
    }

    // ==============================================
    // Fonctions de vérification côté client (simulation)
    // ==============================================

    // Vérification de l'existence de l'email (unique)
    async function checkEmailExists(email) {
        // En production: requête API GET /api/users/check-email?email=user@example.com
        return new Promise(resolve => {
            setTimeout(() => {
                const existingEmails = ['admin@pixelverse.com', 'test@example.com'];
                resolve(existingEmails.includes(email.toLowerCase()));
            }, 500);
        });
    }

    // Vérification de l'existence du pseudo (unique)
    async function checkPseudoExists(pseudo) {
        // En production: requête API GET /api/users/check-pseudo?pseudo=MonPseudo
        return new Promise(resolve => {
            setTimeout(() => {
                const existingPseudos = ['admin', 'testuser', 'joseleboss'];
                resolve(existingPseudos.includes(pseudo.toLowerCase()));
            }, 500);
        });
    }

    // Vérification de la force du mot de passe
    function checkPasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++; // Longueur minimale
        if (/[A-Z]/.test(password)) score++; // Majuscule
        if (/[a-z]/.test(password)) score++; // Minuscule
        if (/[0-9]/.test(password)) score++; // Chiffre
        if (/[^A-Za-z0-9]/.test(password)) score++; // Caractère spécial

        let strength = 'weak';
        if (score >= 3) strength = 'medium';
        if (score >= 5) strength = 'strong';

        return { score, strength };
    }

    // ==============================================
    // 1. Logique du formulaire de Connexion
    // ==============================================
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            hideFeedback(loginMessage);

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // En production: Envoyer les identifiants au back-end
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password })
            // });
            // const data = await response.json();

            // Simulation de la connexion
            const simulationSuccess = (email === 'test@example.com' && password === 'Password123!'); // Pseudo user
            const simulationAdminSuccess = (email === 'admin@pixelverse.com' && password === 'AdminPass!'); // Pseudo admin

            if (simulationSuccess || simulationAdminSuccess) {
                // Stocker l'état de connexion et le pseudo/email (simulation)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPseudo', simulationAdminSuccess ? 'Admin' : 'TestUser'); // Simulation du pseudo
                localStorage.setItem('userRole', simulationAdminSuccess ? 'admin' : 'player'); // Simulation du rôle

                showFeedback(loginMessage, 'Connexion réussie ! Redirection...', 'success');
                // Rediriger vers l'espace utilisateur ou la page d'accueil après un court délai
                setTimeout(() => {
                
                    window.location.href = './user-page.html'; 
                }, 1500);
            } else {
                showFeedback(loginMessage, 'Email ou mot de passe incorrect.');
            }
        });
    }

    // ==============================================
    // 2. Logique du formulaire de Création de Compte
    // ==============================================
    if (signupForm) {
        let emailCheckTimeout, pseudoCheckTimeout;

        // Validation email en temps réel
        signupEmailInput.addEventListener('input', () => {
            clearTimeout(emailCheckTimeout);
            hideFeedback(emailFeedback);
            const email = signupEmailInput.value.trim();

            if (email.length > 0) {
                emailCheckTimeout = setTimeout(async () => {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        showFeedback(emailFeedback, 'Veuillez entrer une adresse email valide.');
                        return;
                    }
                    if (await checkEmailExists(email)) {
                        showFeedback(emailFeedback, 'Cette adresse email est déjà utilisée.');
                    } else {
                        showFeedback(emailFeedback, 'Email disponible !', 'success');
                    }
                }, 700);
            }
        });

        // Validation pseudo en temps réel (réutilise la fonction checkPseudoExists)
        signupPseudoInput.addEventListener('input', () => {
            clearTimeout(pseudoCheckTimeout);
            hideFeedback(pseudoSignupFeedback);
            const pseudo = signupPseudoInput.value.trim();

            if (pseudo.length > 0) {
                if (pseudo.length < 3) {
                    showFeedback(pseudoSignupFeedback, 'Le pseudo doit contenir au moins 3 caractères.');
                    return;
                }
                pseudoCheckTimeout = setTimeout(async () => {
                    if (await checkPseudoExists(pseudo)) {
                        showFeedback(pseudoSignupFeedback, 'Ce pseudo est déjà utilisé.');
                    } else {
                        showFeedback(pseudoSignupFeedback, 'Pseudo disponible !', 'success');
                    }
                }, 700);
            }
        });

        // Validation mot de passe en temps réel
        signupPasswordInput.addEventListener('input', () => {
            hideFeedback(passwordFeedback);
            const password = signupPasswordInput.value;
            const confirmPassword = signupConfirmPasswordInput.value;

            const { score, strength } = checkPasswordStrength(password);
            passwordStrengthBar.style.width = `${(score / 5) * 100}%`;
            passwordStrengthIndicator.className = `password-strength-indicator ${strength}`;

            let messages = [];
            if (password.length < 8) messages.push('8 caractères min.');
            if (!/[A-Z]/.test(password)) messages.push('1 majuscule');
            if (!/[a-z]/.test(password)) messages.push('1 minuscule');
            if (!/[0-9]/.test(password)) messages.push('1 chiffre');
            if (!/[^A-Za-z0-9]/.test(password)) messages.push('1 caractère spécial');

            if (messages.length > 0) {
                showFeedback(passwordFeedback, 'Votre mot de passe doit contenir : ' + messages.join(', '));
            } else {
                hideFeedback(passwordFeedback);
            }

            // Vérifier aussi la confirmation du mot de passe
            if (confirmPassword.length > 0 && password !== confirmPassword) {
                showFeedback(confirmPasswordFeedback, 'Les mots de passe ne correspondent pas.');
            } else {
                hideFeedback(confirmPasswordFeedback);
            }
        });

        // Validation confirmation mot de passe en temps réel
        signupConfirmPasswordInput.addEventListener('input', () => {
            hideFeedback(confirmPasswordFeedback);
            const password = signupPasswordInput.value;
            const confirmPassword = signupConfirmPasswordInput.value;

            if (password !== confirmPassword) {
                showFeedback(confirmPasswordFeedback, 'Les mots de passe ne correspondent pas.');
            } else {
                hideFeedback(confirmPasswordFeedback);
            }
        });


        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            hideFeedback(signupMessage);

            const email = signupEmailInput.value.trim();
            const pseudo = signupPseudoInput.value.trim();
            const password = signupPasswordInput.value;
            const confirmPassword = signupConfirmPasswordInput.value;

            let hasError = false;

            // Re-valider tous les champs avant soumission
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showFeedback(emailFeedback, 'Veuillez entrer une adresse email valide.');
                hasError = true;
            } else if (await checkEmailExists(email)) {
                showFeedback(emailFeedback, 'Cette adresse email est déjà utilisée.');
                hasError = true;
            }

            if (pseudo.length < 3) {
                showFeedback(pseudoSignupFeedback, 'Le pseudo doit contenir au moins 3 caractères.');
                hasError = true;
            } else if (await checkPseudoExists(pseudo)) {
                showFeedback(pseudoSignupFeedback, 'Ce pseudo est déjà utilisé.');
                hasError = true;
            }

            const { score: passwordScore } = checkPasswordStrength(password);
            if (passwordScore < 5) { // Minimum pour être considéré "fort"
                showFeedback(passwordFeedback, 'Votre mot de passe est trop faible. Veuillez suivre les recommandations.');
                hasError = true;
            }
            if (password !== confirmPassword) {
                showFeedback(confirmPasswordFeedback, 'Les mots de passe ne correspondent pas.');
                hasError = true;
            }

            if (!signupConsentCheckbox.checked) {
                showFeedback(signupMessage, 'Vous devez accepter les conditions pour créer un compte.');
                hasError = true;
            }

            if (hasError) {
                showFeedback(signupMessage, 'Veuillez corriger les erreurs du formulaire.', 'error');
                return;
            }

            // --- Ici, on enverrait les données au back-end pour créer le compte ---
            try {
                // const response = await fetch('/api/signup', { // Endpoint API à créer sur le back-end
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ email, pseudo, password })
                // });
                // const data = await response.json();

                const simulationSuccess = true; // Remplacez par une vraie vérification de la réponse.
                if (simulationSuccess) { // if (response.ok) { ... }
                    showFeedback(signupMessage, data.message || 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.', 'success');
                    // Redirection optionnelle
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 3000); // Redirige après 3 secondes
                } else {
                    // Le statut HTTP n'est pas 2xx (ex: 400 Bad Request, 409 Conflict)
                    showFeedback(signupMessage, data.message || 'Une erreur est survenue lors de la création du compte.', 'error');
                }
            } catch (error) {
                console.error('Erreur lors de l\'inscription :', error);
                showFeedback(signupMessage, 'Une erreur réseau est survenue. Veuillez réessayer.', 'error');
            }
        });
    }

    // ==============================================
    // 3. Logique du formulaire Mot de Passe Oublié
    // ==============================================
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            hideFeedback(forgotPasswordMessage);

            const email = document.getElementById('forgot-email').value;
            const pseudo = document.getElementById('forgot-pseudo').value;

            // --- Envoyer la requête au back-end ---
            try {
                const response = await fetch('/api/auth/forgot-password', { // Endpoint API à créer sur le back-end
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, pseudo })
                });
                const data = await response.json();

                if (response.ok) {
                    showFeedback(forgotPasswordMessage, data.message || 'Si un compte correspondant existe, un email de réinitialisation vous a été envoyé.', 'success');
                } else {
                    showFeedback(forgotPasswordMessage, data.message || 'Erreur lors de la demande de réinitialisation. Veuillez vérifier vos informations.', 'error');
                }
            } catch (error) {
                console.error('Erreur lors de la réinitialisation du mot de passe :', error);
                showFeedback(forgotPasswordMessage, 'Une erreur réseau est survenue. Veuillez réessayer.', 'error');
            }
        });
    }

    // ==============================================
    // Gestion de l'état de connexion dans le HEADER (via script.js ou directement ici)
    // ==============================================

    // Cette partie pourrait être dans script.js si tu veux un fichier JS global pour le header/footer
    // Mais pour l'exemple, nous allons la mettre ici et supposer que script.js n'existe pas encore ou sera fusionné.
    
    const authLinkContainer = document.getElementById('auth-link'); // Le <li> qui contient le lien de connexion/déconnexion

    function updateAuthLink() {
        const token = localStorage.getItem('token'); // Vérifier l'existence du token JWT
        const userPseudo = localStorage.getItem('userPseudo');

        if (authLinkContainer) {
            authLinkContainer.innerHTML = ''; // Vider le contenu actuel

            if (token) {
                // Si l'utilisateur est connecté
                const logoutLink = document.createElement('a');
                logoutLink.href = '#'; // Pas de vraie page, juste un déclencheur JS
                logoutLink.innerHTML = `<i class="fas fa-sign-out-alt"></i> Déconnexion (${userPseudo || 'Utilisateur'})`;
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    logoutUser(); // Appel à la fonction de déconnexion
                });
                authLinkContainer.appendChild(logoutLink);
            } else {
                // Si l'utilisateur n'est pas connecté
                const loginLink = document.createElement('a');
                loginLink.href = 'login.html';
                loginLink.innerHTML = `<i class="fas fa-sign-in-alt"></i> Connexion`;
                authLinkContainer.appendChild(loginLink);
            }
        }
    }

    function logoutUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('userPseudo');
        localStorage.removeItem('userRole'); // Supprimer toutes les infos de session
        alert('Vous avez été déconnecté.');
        updateAuthLink(); // Mettre à jour le lien dans le header
        window.location.href = 'index.html'; // Rediriger vers l'accueil
    }

    // Appeler la fonction au chargement de la page et après chaque connexion/déconnexion
    updateAuthLink();


    // Pour s'assurer que l'indicateur de force du mot de passe apparaît aussi sur le signup
    // quand on y accède directement
    if (signupPasswordInput && signupPasswordInput.value.length > 0) {
        signupPasswordInput.dispatchEvent(new Event('input'));
    }
});

// Assurez-vous que les fonctions utilitaires globales comme `updateAuthLink` soient accessibles si nécessaire
// Mais il est généralement préférable de tout encapsuler dans le DOMContentLoaded ou dans des modules.
// Pour ce projet, je vais considérer que auth.js gère la mise à jour du lien d'auth dans le header.