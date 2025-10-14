<?php
include 'conexao.php';

// Pega os dados do formulário
$id = $_POST['id'];
$nome_produto = $_POST['nome_produto'];
$quantidade_vendida = $_POST['quantidade_vendida'];
$data_venda = $_POST['data_venda'];

// Prepara e executa a query
$stmt = $conn->prepare("UPDATE produtos SET nome_produto = ?, quantidade_vendida = ?, data_venda = ? WHERE id = ?");
$stmt->bind_param("sisi", $nome_produto, $quantidade_vendida, $data_venda, $id);

if ($stmt->execute()) {
    echo "Registro atualizado com sucesso!";
} else {
    echo "Erro ao atualizar: " . $stmt->error;
}

$stmt->close();
$conn->close();

// Redireciona de volta para a lista
header("Location: index.php");
exit();
?>