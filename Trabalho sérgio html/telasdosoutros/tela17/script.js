// Array para armazenar os registros de auditoria (simula um "banco de dados" local)
let registrosAuditoria = [];
let proximoId = 1;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formAuditoria');
    const resultadoDiv = document.getElementById('resultadoAuditoria');
    const tabelaRegistros = document.getElementById('tabelaRegistros');
    const semRegistrosParagrafo = document.getElementById('semRegistros');
    const btnSalvar = document.getElementById('btnSalvarAuditoria');
    const idEdicaoInput = document.getElementById('registroIdEdicao');

    // Função principal para realizar o cálculo e determinar o status
    function realizarAuditoria(valorVendido, valorRecebido) {
        let diferenca = valorVendido - valorRecebido;
        let status = '';
        let mensagemDetalhe = '';

        if (Math.abs(diferenca) < 0.01) {
            status = 'Conferido';
            mensagemDetalhe = 'O Valor Total Vendido é exatamente igual ao Valor Total Recebido.';
        } else if (diferenca > 0.01) {
            status = 'Divergência (Falta)';
            mensagemDetalhe = `O Valor Vendido é maior que o Recebido. Diferença de R$ ${diferenca.toFixed(2)}.`;
        } else { // diferenca < -0.01
            status = 'Divergência (Excesso)';
            mensagemDetalhe = `O Valor Recebido é maior que o Vendido. Diferença de R$ ${Math.abs(diferenca).toFixed(2)}.`;
        }

        return { diferenca, status, mensagemDetalhe };
    }

    // Função para renderizar a tabela com os registros
    function renderizarTabela() {
        tabelaRegistros.innerHTML = ''; // Limpa a tabela

        if (registrosAuditoria.length === 0) {
            semRegistrosParagrafo.style.display = 'block';
            return;
        }

        semRegistrosParagrafo.style.display = 'none';

        registrosAuditoria.forEach(registro => {
            const tr = document.createElement('tr');
            
            // Define a cor da linha com base no status
            let statusClass = registro.status.includes('Divergência') ? 'table-danger' : 'table-success';
            tr.className = statusClass;

            tr.innerHTML = `
                <td>${registro.id}</td>
                <td>${registro.valorVendido.toFixed(2)}</td>
                <td>${registro.valorRecebido.toFixed(2)}</td>
                <td>${registro.diferenca.toFixed(2)}</td>
                <td>${registro.status}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2 btn-editar" data-id="${registro.id}">Editar</button>
                    <button class="btn btn-sm btn-danger btn-excluir" data-id="${registro.id}">Excluir</button>
                </td>
            `;
            tabelaRegistros.appendChild(tr);
        });

        // Adiciona event listeners aos novos botões
        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', carregarParaEdicao);
        });
        document.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', excluirRegistro);
        });
    }

    // Lógica de Submissão/Edição
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const valorVendido = parseFloat(document.getElementById('valorVendido').value);
        const valorRecebido = parseFloat(document.getElementById('valorRecebido').value);
        const numPassagens = parseInt(document.getElementById('numPassagens').value);
        const dataRecebimento = document.getElementById('dataRecebimento').value;
        const idEdicao = idEdicaoInput.value;

        const auditoria = realizarAuditoria(valorVendido, valorRecebido);

        const novoRegistro = {
            id: idEdicao ? parseInt(idEdicao) : proximoId,
            valorVendido: valorVendido,
            valorRecebido: valorRecebido,
            numPassagens: numPassagens,
            dataRecebimento: dataRecebimento,
            diferenca: auditoria.diferenca,
            status: auditoria.status,
            mensagemDetalhe: auditoria.mensagemDetalhe
        };

        if (idEdicao) {
            // EDICÃO
            const index = registrosAuditoria.findIndex(r => r.id === novoRegistro.id);
            if (index !== -1) {
                registrosAuditoria[index] = novoRegistro;
            }
            // Limpa o estado de edição
            idEdicaoInput.value = '';
            btnSalvar.textContent = 'Executar Auditoria';
        } else {
            // NOVO REGISTRO
            registrosAuditoria.push(novoRegistro);
            proximoId++;
        }

        // Exibe o detalhe do último registro auditado (opcional)
        exibirDetalheAuditoria(novoRegistro, auditoria.mensagemDetalhe);

        // Atualiza a lista e limpa o formulário
        renderizarTabela();
        form.reset();
    });
    
    // Função para carregar os dados no formulário para edição
    function carregarParaEdicao(e) {
        const id = parseInt(e.target.dataset.id);
        const registro = registrosAuditoria.find(r => r.id === id);

        if (registro) {
            document.getElementById('valorVendido').value = registro.valorVendido;
            document.getElementById('valorRecebido').value = registro.valorRecebido;
            document.getElementById('numPassagens').value = registro.numPassagens;
            document.getElementById('dataRecebimento').value = registro.dataRecebimento;
            
            // Define o ID no campo escondido e muda o texto do botão
            idEdicaoInput.value = registro.id;
            btnSalvar.textContent = 'Salvar Edição';
            
            // Rola para o topo do formulário
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Função para excluir um registro
    function excluirRegistro(e) {
        const id = parseInt(e.target.dataset.id);
        
        if (confirm(`Tem certeza que deseja excluir o registro de ID ${id}?`)) {
            // Filtra o array, removendo o registro com o ID correspondente
            registrosAuditoria = registrosAuditoria.filter(r => r.id !== id);
            renderizarTabela();
        }
    }
    
    // Função auxiliar para exibir o detalhe da auditoria no topo
    function exibirDetalheAuditoria(registro, mensagemDetalhe) {
        let statusClass = registro.status.includes('Divergência') ? 'alert-danger' : 'alert-success';

        resultadoDiv.className = `mt-4 p-3 rounded alert ${statusClass}`;
        resultadoDiv.innerHTML = `
            <h4>Resultado da Auditoria (ID ${registro.id}):</h4>
            <p class="lead fw-bold">Status: ${registro.status}</p>
            <hr>
            <ul class="list-unstyled">
                <li><strong>Valor Vendido:</strong> R$ ${registro.valorVendido.toFixed(2)}</li>
                <li><strong>Valor Recebido:</strong> R$ ${registro.valorRecebido.toFixed(2)}</li>
                <li><strong>Diferença:</strong> R$ ${registro.diferenca.toFixed(2)}</li>
            </ul>
            <p>${mensagemDetalhe}</p>
        `;
        resultadoDiv.style.display = 'block';
    }

    // Inicializa a tabela ao carregar a página
    renderizarTabela();
});