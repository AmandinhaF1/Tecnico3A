document.addEventListener('DOMContentLoaded', function () {
    // Função para gerar valores aleatórios para simulação
    const gerarValor = (min, max, casasDecimais = 0) => {
        return (Math.random() * (max - min) + min).toFixed(casasDecimais);
    };

    // Função para formatar números como moeda
    const formatarMoeda = (valor) => {
        return `R$ ${parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    // Função para atualizar os KPIs
    const atualizarKPIs = () => {
        document.getElementById('taxa-ocupacao').textContent = `${gerarValor(75, 95, 1)}%`;
        document.getElementById('receita-rota').textContent = formatarMoeda(gerarValor(150000, 250000));
        document.getElementById('custo-ask').textContent = formatarMoeda(gerarValor(0.30, 0.50, 2));
        document.getElementById('preco-medio').textContent = formatarMoeda(gerarValor(450, 750));
        document.getElementById('custos-operacionais').textContent = formatarMoeda(gerarValor(5000000, 8000000));
    };

    // Configuração dos Gráficos
    const ctxOcupacao = document.getElementById('ocupacaoChart').getContext('2d');
    const ocupacaoChart = new Chart(ctxOcupacao, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
            datasets: [{
                label: 'Taxa de Ocupação Histórica (%)',
                data: [82, 85, 83, 88, 90, 92],
                borderColor: 'rgba(0, 90, 158, 1)',
                backgroundColor: 'rgba(0, 90, 158, 0.2)',
                fill: true,
            }]
        }
    });

    const ctxReceita = document.getElementById('receitaChart').getContext('2d');
    const receitaChart = new Chart(ctxReceita, {
        type: 'bar',
        data: {
            labels: ['Rota A', 'Rota B', 'Rota C', 'Rota D', 'Rota E'],
            datasets: [{
                label: 'Receita por Rota (Milhares de R$)',
                data: [230, 180, 210, 190, 250],
                backgroundColor: [
                    'rgba(0, 90, 158, 0.7)',
                    'rgba(0, 123, 255, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(93, 173, 226, 0.7)',
                    'rgba(133, 193, 233, 0.7)'
                ],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Atualiza os KPIs a cada 5 segundos
    setInterval(atualizarKPIs, 5000);

    // Primeira atualização ao carregar a página
    atualizarKPIs();
});