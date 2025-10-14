<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Lista de Vendas</title>
    <link rel="stylesheet" href="style.css">
    
    </head>
<body>

<div class="container">

    <h2>Gerenciamento de Vendas de Produtos</h2>

    <div class="nav">
        <a href="form_adicionar.php" class="btn"><b>+ Adicionar Nova Venda</b></a>
        <a href="dashboard.php" class="btn btn-secondary"><b>Ver Dashboard</b></a>
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome do Produto</th>
                <th>Quantidade Vendida</th>
                <th>Data da Venda</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <?php
            include 'conexao.php';
            $sql = "SELECT id, nome_produto, quantidade_vendida, DATE_FORMAT(data_venda, '%d/%m/%Y') as data_formatada FROM produtos ORDER BY data_venda DESC";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row["id"] . "</td>";
                    echo "<td>" . htmlspecialchars($row["nome_produto"]) . "</td>";
                    echo "<td>" . $row["quantidade_vendida"] . "</td>";
                    echo "<td>" . $row["data_formatada"] . "</td>";
                    echo "<td class='actions'>";
                    echo "<a href='form_editar.php?id=" . $row["id"] . "'>Editar</a>";
                    echo "<a href='excluir_venda.php?id=" . $row["id"] . "' onclick='return confirm(\"Tem certeza que deseja excluir esta venda?\");'>Excluir</a>";
                    echo "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='5'>Nenhuma venda registrada.</td></tr>";
            }
            $conn->close();
            ?>
        </tbody>
    </table>

</div> </body>
</html>