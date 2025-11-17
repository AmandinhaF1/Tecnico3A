let pagamentos = []; 

const STORAGE_KEY = 'pagamentosAviao';

function carregarPagamentos() {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    
    if (dadosSalvos && dadosSalvos !== '[]') { 
        pagamentos = JSON.parse(dadosSalvos);
    } else {
        pagamentos = [
            { id: Date.now(), tipo: "Combustível - Voo SP/RJ", data: "2025-10-05", valor: 85000.00, pago: false },
            { id: Date.now() + 1, tipo: "Salários - Tripulação", data: "2025-10-07", valor: 250000.00, pago: false },
            { id: Date.now() + 2, tipo: "Leasing Aeronave A320", data: "2025-10-15", valor: 550000.00, pago: false },
            { id: Date.now() + 3, tipo: "Imposto - ICMS", data: "2025-10-20", valor: 120000.00, pago: false },
        ];
        salvarPagamentos();
    }
}

function salvarPagamentos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pagamentos));
}

function renderizarVencimentos() {
    const listaVencimentos = document.getElementById('listaVencimentos');
    listaVencimentos.innerHTML = '';

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 

    pagamentos.sort((a, b) => {
        if (a.pago && !b.pago) return 1;
        if (!a.pago && b.pago) return -1;
        return new Date(a.data) - new Date(b.data); 
    });

    pagamentos.forEach(pagamento => {
        const dataVencimento = new Date(pagamento.data);
        const diferencaEmTempo = dataVencimento.getTime() - hoje.getTime();
        const diasRestantes = Math.ceil(diferencaEmTempo / (1000 * 60 * 60 * 24));
        
        let classeAlerta = '';
        let status = 'Em dia';
        let acaoButton = '';

        if (pagamento.pago) {
            classeAlerta = 'pago';
            status = 'PAGO';
            acaoButton = `
                <button class="btn btn-sm btn-info btn-desfazer-pago me-1" data-id="${pagamento.id}">Desfazer Pagamento</button>
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${pagamento.id}">Excluir</button>
            `;
        } else {
            if (diasRestantes < 0) {
                classeAlerta = 'alerta-baixo';
                status = 'VENCIDO!';
            } else if (diasRestantes <= 7) {
                classeAlerta = 'alerta-baixo';
                status = 'CRÍTICO! Pagar Imediatamente';
            } else if (diasRestantes <= 15) {
                classeAlerta = 'alerta-medio';
                status = 'Atenção, Próximo Vencimento';
            } else {
                classeAlerta = 'alerta-ok';
                status = 'Programado';
            }
            acaoButton = `
                <button class="btn btn-sm btn-success btn-pagar me-1" data-id="${pagamento.id}">Pago</button>
                <button class="btn btn-sm btn-warning btn-editar me-1" data-id="${pagamento.id}">Editar</button>
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${pagamento.id}">Excluir</button>
            `;
        }

        const dataFormatada = new Date(pagamento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        const valorFormatado = pagamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const diasExibicao = pagamento.pago ? '-' : (diasRestantes < 0 ? 'VENCIDO' : diasRestantes);

        const linha = `
            <tr class="${classeAlerta}">
                <td>${pagamento.tipo}</td>
                <td>${dataFormatada}</td>
                <td>${diasExibicao}</td>
                <td>${valorFormatado}</td>
                <td>${status}</td>
                <td class="text-nowrap">${acaoButton}</td>
            </tr>
        `;
        
        listaVencimentos.innerHTML += linha;
    });

    adicionarListenersPagamento();
}

function adicionarNovoPagamento(event) {
    event.preventDefault(); 

    const tipo = document.getElementById('tipo').value; 
    const dataVencimento = document.getElementById('dataVencimento').value; 
    const valor = parseFloat(document.getElementById('valor').value);
    
    if (!tipo || !dataVencimento || isNaN(valor) || valor <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const novoPagamento = {
        id: Date.now(), 
        tipo: tipo,
        data: dataVencimento,
        valor: valor,
        pago: false
    };

    pagamentos.push(novoPagamento);
    salvarPagamentos();
    renderizarVencimentos();

    document.getElementById('formAdicionarPagamento').reset();
    
    const collapseElement = document.getElementById('collapseForm');
    if (collapseElement.classList.contains('show') && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
         new bootstrap.Collapse(collapseElement).hide();
    }
}

function marcarComoPago(id) {
    const index = pagamentos.findIndex(p => p.id === id);
    if (index !== -1 && !pagamentos[index].pago) {
        pagamentos[index].pago = true;
        salvarPagamentos();
        renderizarVencimentos();
    }
}

function desfazerPagamento(id) {
    const index = pagamentos.findIndex(p => p.id === id);
    if (index !== -1 && pagamentos[index].pago) { 
        pagamentos[index].pago = false;
        salvarPagamentos();
        renderizarVencimentos();
    }
}


function excluirPagamento(id) {
    if (confirm("Tem certeza que deseja excluir este pagamento?")) {
        pagamentos = pagamentos.filter(p => p.id !== id);
        salvarPagamentos();
        renderizarVencimentos();
    }
}

function abrirModalEdicao(id) {
    const pagamento = pagamentos.find(p => p.id === id);
    if (!pagamento) return;

    document.getElementById('edit-id').value = pagamento.id;
    document.getElementById('edit-tipo').value = pagamento.tipo;
    document.getElementById('edit-dataVencimento').value = pagamento.data;
    document.getElementById('edit-valor').value = pagamento.valor;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

function salvarEdicao() {
    const id = parseInt(document.getElementById('edit-id').value);
    const tipo = document.getElementById('edit-tipo').value;
    const dataVencimento = document.getElementById('edit-dataVencimento').value;
    const valor = parseFloat(document.getElementById('edit-valor').value);

    if (!tipo || !dataVencimento || isNaN(valor) || valor <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const index = pagamentos.findIndex(p => p.id === id);
    if (index !== -1) {
        pagamentos[index].tipo = tipo;
        pagamentos[index].data = dataVencimento;
        pagamentos[index].valor = valor;
        
        salvarPagamentos();
        renderizarVencimentos();
        
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        editModal.hide();
    }
}

function adicionarListenersPagamento() {
    document.querySelectorAll('.btn-pagar').forEach(button => {
        button.addEventListener('click', (e) => marcarComoPago(parseInt(e.target.getAttribute('data-id'))));
    });

    document.querySelectorAll('.btn-desfazer-pago').forEach(button => {
        button.addEventListener('click', (e) => desfazerPagamento(parseInt(e.target.getAttribute('data-id'))));
    });

    document.querySelectorAll('.btn-excluir').forEach(button => {
        button.addEventListener('click', (e) => excluirPagamento(parseInt(e.target.getAttribute('data-id'))));
    });


    document.querySelectorAll('.btn-editar').forEach(button => {
        button.addEventListener('click', (e) => abrirModalEdicao(parseInt(e.target.getAttribute('data-id'))));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarPagamentos(); 
    renderizarVencimentos();

    const form = document.getElementById('formAdicionarPagamento');
    if (form) {
        form.addEventListener('submit', adicionarNovoPagamento);
    }
    
    document.getElementById('btnSalvarEdicao').addEventListener('click', salvarEdicao);
});