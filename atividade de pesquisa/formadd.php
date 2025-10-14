<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Adicionar Venda</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h2>Registrar Nova Venda</h2>
    <form action="adicionar_venda.php" method="post">
        <label for="nome_produto">Nome do Produto:</label>
        <input type="text" id="nome_produto" name="nome_produto" required>

        <label for="quantidade_vendida">Quantidade Vendida:</label>
        <input type="number" id="quantidade_vendida" name="quantidade_vendida" required>

        <label for="data_venda">Data da Venda:</label>
        <input type="date" id="data_venda" name="data_venda" required>

        <div class="form-actions">
            <input type="submit" value="Salvar Venda" class="btn">
            <a href="index.php" class="btn btn-secondary">Cancelar</a>
        </div>
    </form>
</div>

</body>
</html>