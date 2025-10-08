<?php
// Fichier: api/login.php

// Démarrer la session PHP. C'est indispensable pour stocker des informations sur l'utilisateur entre les pages.
session_start();

// Inclure le fichier de configuration de la base de données
require_once '../config/database.php';

// Définir le type de contenu de la réponse comme JSON
header('Content-Type: application/json');

// Récupérer les données envoyées par le client (JavaScript)
// file_get_contents('php://input') lit le corps de la requête POST brute.
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier si les données nécessaires (email, password) sont bien présentes
if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['status' => 'error', 'message' => 'Email ou mot de passe manquant.']);
    exit();
}

// Nettoyer les entrées pour la sécurité
$email = $data['email'];
$password = $data['password'];

try {
    // 1. Rechercher l'utilisateur par email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // 2. Vérifier si l'utilisateur existe ET si le mot de passe est correct
    // password_verify() compare le mot de passe fourni avec le hash stocké dans la base de données.
    if ($user && password_verify($password, $user['password_hash'])) {
        // Le mot de passe est correct !

        // 3. Stocker les informations de l'utilisateur dans la session PHP
        // C'est la manière sécurisée de "connecter" un utilisateur côté serveur.
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_pseudo'] = $user['pseudo'];
        $_SESSION['user_role'] = $user['role'];

        // 4. Renvoyer une réponse de succès au client
        http_response_code(200); // OK
        echo json_encode([
            'status' => 'success',
            'message' => 'Connexion réussie !',
            'user' => [
                'pseudo' => $user['pseudo'],
                'role' => $user['role']
            ]
        ]);

    } else {
        // L'utilisateur n'a pas été trouvé ou le mot de passe est incorrect
        http_response_code(401); // Unauthorized
        echo json_encode(['status' => 'error', 'message' => 'Email ou mot de passe incorrect.']);
    }

} catch (PDOException $e) {
    // Gérer les erreurs de base de données
    http_response_code(500); // Internal Server Error
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur serveur lors de la tentative de connexion: ' . $e->getMessage()
    ]);
}

