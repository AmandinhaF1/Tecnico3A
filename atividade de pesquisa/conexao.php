<?php
// Configurações do banco de dados
$servidor = "localhost";
$usuario = "root"; // Usuário padrão do XAMPP/WAMP
$senha = "";       // Senha padrão do XAMPP/WAMP
$banco = "minha_loja";

// Cria a conexão
$conn = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>