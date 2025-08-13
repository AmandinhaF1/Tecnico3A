// Função genérica para criar gráficos
function createChart(id, type, labels, data, label) {
    const ctx = document.getElementById(id);
    if (ctx) {
        new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: type === 'line' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                    borderColor: type === 'line' ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
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
    }
}

createChart('salesChart', 'line', ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], [4505000, 4065000, 5140000, 4505000, 3740000, 4125000], 'Vendas');

createChart('purchasesChart', 'bar', ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], [3540000, 4065000, 5140000, 4505000, 3740000, 4125000], 'Compras');

const vendasMensaisData = [
    { produto: '', quantidade: 20, precoUnitario: 200, valorTotal: 4000 },
    { produto: 'Produto Y', quantidade: 10, precoUnitario: 300, valorTotal: 3000 },
    { produto: 'Produto Z', quantidade: 5, precoUnitario: 500, valorTotal: 2500 },
];

const comprasMensaisData = [
    { produto: 'Aeronaves e Peças de Reposição', quantidade: 43, custoUnitario: 500000, custoTotal: 21500000},
    { produto: 'Serviços de Manutenção', quantidade: 55, custoUnitario: 50000, custoTotal: 2750000 },
    { produto: 'Equipamentos de TI e Tecnologia', quantidade: 37, custoUnitario: 20000, custoTotal: 740000 },
    { produto: 'Outros (combustíveis, uniformes e materiais diversos)', quantidade: 5000, custoUnitario: 125000, custoTotal: 5000 }
];

const vendasCard = document.getElementById('cardVendasMensais');
if (vendasCard) {
    const vendasModal = document.getElementById('vendasModal');
    const vendasCloseButton = vendasModal.querySelector('.close-button');
    const vendasModalTableBody = vendasModal.querySelector('tbody');

    const populateVendasTable = () => {
        vendasModalTableBody.innerHTML = '';
        vendasMensaisData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.produto}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.precoUnitario.toFixed(2).replace('.', ',')}</td>
                <td>R$ ${item.valorTotal.toFixed(2).replace('.', ',')}</td>
            `;
            vendasModalTableBody.appendChild(row);
        });
    };

    vendasCard.addEventListener('click', () => {
        populateVendasTable();
        vendasModal.style.display = 'block';
    });

    vendasCloseButton.addEventListener('click', () => {
        vendasModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === vendasModal) {
            vendasModal.style.display = 'none';
        }
    });
}

const comprasCard = document.getElementById('cardComprasMensais');
if (comprasCard) {
    const comprasModal = document.getElementById('comprasModal');
    const comprasCloseButton = comprasModal.querySelector('.close-button');
    const comprasModalTableBody = comprasModal.querySelector('tbody');

    const populateComprasTable = () => {
        comprasModalTableBody.innerHTML = '';
        comprasMensaisData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.produto}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.custoUnitario.toFixed(0).replace('.', ',')}</td>
                <td>R$ ${item.custoTotal.toFixed(0).replace('.', ',')}</td>
            `;
            comprasModalTableBody.appendChild(row);
        });
    };

    comprasCard.addEventListener('click', () => {
        populateComprasTable();
        comprasModal.style.display = 'block';
    });

    comprasCloseButton.addEventListener('click', () => {
        comprasModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === comprasModal) {
            comprasModal.style.display = 'none';
        }
    });
}