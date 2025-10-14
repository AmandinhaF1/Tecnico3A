<?php
include 'conexao.php';
$id = $_GET['id'];

// Usando prepared statement para segurança
$stmt = $conn->prepare("SELECT * FROM produtos WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$venda = $result->fetch_assoc();
$stmt->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Editar Venda</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h2>Editar Registro de Venda</h2>
    <form action="atualizar_venda.php" method="post">
        <input type="hidden" name="id" value="<?php echo $venda['id']; ?>">

        <label for="nome_produto">Nome do Produto:</label>
        <input type="text" id="nome_produto" name="nome_produto" value="<?php echo htmlspecialchars($venda['nome_produto']); ?>" required>

        <label for="quantidade_vendida">Quantidade Vendida:</label>
        <input type="number" id="quantidade_vendida" name="quantidade_vendida" value="<?php echo $venda['quantidade_vendida']; ?>" required>

        <label for="data_venda">Data da Venda:</label>
        <input type="date" id="data_venda" name="data_venda" value="<?php echo $venda['data_venda']; ?>" required>

        <div class="form-actions">
            <input type="submit" value="Atualizar Venda" class="btn">
            <a href="index.php" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
</div>

</body>
</html>