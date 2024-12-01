<?php
// Conecta ao banco de dados SQLite
try {
    $db = new PDO('sqlite:comments.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Cria a tabela de comentários caso ela não exista
    $db->exec("CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        comment TEXT NOT NULL
    )");
} catch (PDOException $e) {
    echo "Erro ao conectar ao banco de dados: " . $e->getMessage();
    exit();
}
?>
