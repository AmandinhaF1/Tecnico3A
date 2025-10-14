<?php
include 'conexao.php';

// Pega os dados do formulário
$nome_produto = $_POST['nome_produto'];
$quantidade_vendida = $_POST['quantidade_vendida'];
$data_venda = $_POST['data_venda'];

// Prepara e executa a query para evitar SQL Injection
$stmt = $conn->prepare("INSERT INTO produtos (nome_produto, quantidade_vendida, data_venda) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $nome_produto, $quantidade_vendida, $data_venda);

if ($stmt->execute()) {
    echo "Nova venda registrada com sucesso!";
} else {
    echo "Erro: " . $stmt->error;
}

$stmt->close();
$conn->close();

// Redireciona de volta para a lista
header("Location: index.php");
exit();
?>