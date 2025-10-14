<?php
include 'conexao.php';

$id = $_GET['id'];

// Prepara e executa a query
$stmt = $conn->prepare("DELETE FROM produtos WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "Venda excluída com sucesso!";
} else {
    echo "Erro ao excluir: " . $stmt->error;
}

$stmt->close();
$conn->close();

// Redireciona de volta para a lista
header("Location: index.php");
exit();
?>