<?php
// Fichier: config/database.php

// Paramètres de connexion à la base de données
define('DB_HOST', 'localhost'); // Hôte de la base de données (généralement localhost)
define('DB_NAME', 'pixelverse'); // Nom de la base de données
define('DB_USER', 'root');      // Nom d'utilisateur de la base de données (par défaut 'root' sur XAMPP)
define('DB_PASS', '');          // Mot de passe (par défaut vide sur XAMPP)

// Créer une connexion PDO (PHP Data Objects)
// PDO est une manière moderne et sécurisée d'interagir avec une base de données en PHP
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8",
        DB_USER,
        DB_PASS
    );

    // Configurer PDO pour qu'il lance des exceptions en cas d'erreur
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Optionnel: Configurer le mode de récupération par défaut pour obtenir des tableaux associatifs
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // En cas d'échec de la connexion, on arrête tout et on affiche un message d'erreur.
    // En production, on enregistrerait cette erreur dans un fichier de log au lieu de l'afficher.
    header('Content-Type: application/json');
    http_response_code(500); // Erreur interne du serveur
    echo json_encode([
        'status' => 'error',
        'message' => 'Erreur de connexion à la base de données: ' . $e->getMessage()
    ]);
    exit(); // Arrêter l'exécution du script
}

