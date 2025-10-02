// Espera o HTML ser totalmente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos da página com os quais vamos interagir
    const form = document.getElementById('planoContasForm');
    const tabelaContasBody = document.querySelector('#tabelaContas tbody');
    const messageContainer = document.getElementById('message-container');

    // Função para buscar as contas salvas no armazenamento local do navegador
    const getContasSalvas = () => {
        const contasJSON = localStorage.getItem('planoDeContas');
        try {
            // Se houver dados, converte de volta para um array; senão, retorna um array vazio.
            return contasJSON ? JSON.parse(contasJSON) : [];
        } catch (e) {
            console.error("Erro ao ler dados do localStorage:", e);
            return [];
        }
    };

    // Função para salvar o array de contas no armazenamento local
    const salvarContas = (contas) => {
        // Converte o array de contas para o formato JSON (texto) para poder salvar
        localStorage.setItem('planoDeContas', JSON.stringify(contas));
    };

    // Função para mostrar mensagens de sucesso ou erro para o usuário
    const exibirMensagem = (mensagem, tipo = 'error') => {
        messageContainer.textContent = mensagem;
        messageContainer.className = tipo; // Adiciona a classe 'success' ou 'error' para estilizar
        // A mensagem desaparece após 4 segundos
        setTimeout(() => {
            messageContainer.className = '';
        }, 4000);
    };

    // Função para desenhar a tabela de contas na tela
    const renderizarTabela = () => {
        const contas = getContasSalvas();
        tabelaContasBody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados

        // Ordena as contas pelo código
        contas.sort((a, b) => a.codigo.localeCompare(b.codigo));

        if (contas.length === 0) {
            // Se não houver contas, mostra uma mensagem na tabela
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="4" style="text-align: center;">Nenhuma conta cadastrada.</td>`;
            tabelaContasBody.appendChild(tr);
            return;
        }

        // Para cada conta no array, cria uma linha na tabela
        contas.forEach(conta => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${conta.codigo}</td>
                <td>${conta.nome}</td>
                <td>${conta.tipo}</td>
                <td>${conta.descricao || ''}</td>
            `;
            tabelaContasBody.appendChild(tr);
        });
    };

    // Adiciona um "ouvinte" para o evento de envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento padrão da página
        messageContainer.className = '';

        // Pega todos os dados do formulário de uma vez
        const novaConta = Object.fromEntries(new FormData(form).entries());

        const contas = getContasSalvas();

        // Validação para não permitir códigos duplicados
        const codigoJaExiste = contas.some(conta => conta.codigo === novaConta.codigo);
        if (codigoJaExiste) {
            exibirMensagem(`O código de conta '${novaConta.codigo}' já existe.`, 'error');
            return;
        }

        contas.push(novaConta); // Adiciona a nova conta ao array
        salvarContas(contas); // Salva o array atualizado

        exibirMensagem('Conta adicionada com sucesso!', 'success');
        form.reset(); // Limpa os campos do formulário
        document.getElementById('codigo').focus(); // Coloca o cursor de volta no campo "código"

        // Redesenha a tabela para que a nova conta apareça imediatamente
        renderizarTabela();
    });

    // Chama a função para desenhar a tabela assim que a página carrega,
    // mostrando os dados que já estavam salvos
    renderizarTabela();
});