<?php
include('db.php');

// Função para salvar comentário no banco de dados
if (isset($_POST['comment'])) {
    $comment = $_POST['comment'];
    $stmt = $db->prepare("INSERT INTO comments (comment) VALUES (:comment)");
    $stmt->bindParam(':comment', $comment);
    $stmt->execute();

    // Redireciona para evitar reenvio do formulário
    header("Location: " . $_SERVER['PHP_SELF']);
    exit;
}


// Recupera os comentários do banco de dados
$stmt = $db->query("SELECT * FROM comments");
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicação com XSS</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Aplicação com XSS em PHP e SQLite</h1>
        <hr>

        <!-- Reflected XSS -->
        <section id="reflected-xss">
            <h2>Reflected XSS</h2>
            <form method="GET" action="">
                <label for="search">Digite sua busca:</label>
                <input type="text" id="search" name="search" placeholder="Ex: <script>alert('XSS')</script>">
                <button type="submit">Buscar</button>
            </form>
            <div id="search-result">
                <?php
                    if (isset($_GET['search'])) {
                        echo "<p>Resultado da busca: " . $_GET['search'] . "</p>";
                    }
                ?>
            </div>
        </section>

        <hr>

        <!-- DOM-Based XSS -->
        <section id="dom-xss">
            <h2>DOM-Based XSS</h2>
            <label for="dom-input">Digite algo:</label>
            <input type="text" id="dom-input" placeholder="Ex: <img src='x' onerror='alert(1)'>">
            <button onclick="processInput()">Enviar</button>
            <div id="dom-result"></div>
        </section>

        <hr>

        <!-- Stored XSS -->
        <section id="stored-xss">
            <h2>Stored XSS</h2>
            <form method="POST" action="">
                <label for="comment">Deixe um comentário:</label>
                <textarea id="comment" name="comment" rows="3" placeholder="Ex: <script>alert('Stored XSS')</script>"></textarea>
                <button type="submit">Enviar</button>
            </form>

            <h3>Comentários:</h3>
            <div id="comments">
                <?php
                    foreach ($comments as $comment) {
                        echo "<p>" . $comment['comment'] . "</p>"; // Vulnerável a XSS
                    }
                ?>
            </div>
        </section>
    </div>

    <script src="script.js"></script>
</body>
</html>
