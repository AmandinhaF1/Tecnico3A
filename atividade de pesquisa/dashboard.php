<?php
include 'conexao.php';

// Consulta SQL com GROUP BY para somar as quantidades por produto
$sql = "SELECT nome_produto, SUM(quantidade_vendida) as total_vendido 
        FROM produtos 
        GROUP BY nome_produto 
        ORDER BY total_vendido DESC";

$result = $conn->query($sql);

$labels = [];
$data = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $labels[] = $row['nome_produto'];
        $data[] = $row['total_vendido'];
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Dashboard de Vendas</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

<div class="container">

    <div class="nav">
        <a href="index.php" class="btn btn-secondary"><b>&larr; Voltar para a Lista</b></a>
    </div>

    <h2>Total de Vendas por Produto</h2>
    
    <div>
        <canvas id="graficoVendas"></canvas>
    </div>
    
</div>

<script>
    // Pega o contexto do canvas
    const ctx = document.getElementById('graficoVendas').getContext('2d');

    // Passa os dados do PHP para o JavaScript
    const nomesProdutos = <?php echo json_encode($labels); ?>;
    const quantidadesVendidas = <?php echo json_encode($data); ?>;

    // Cria o gráfico
    const graficoVendas = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico: barras
        data: {
            labels: nomesProdutos, // Eixo X: Nomes dos produtos
            datasets: [{
                label: 'Quantidade Total Vendida',
                data: quantidadesVendidas, // Eixo Y: Soma das quantidades
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgba(41, 128, 185, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfico de Vendas por Produto',
                    font: {
                        size: 18
                    }
                }
            }
        }
    });
</script>

</body>
</html>