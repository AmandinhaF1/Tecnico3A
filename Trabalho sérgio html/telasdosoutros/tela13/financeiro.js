document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('manualEntryForm');
    const transactionTypeSelect = document.getElementById('transactionType');
    const accountCodeSelect = document.getElementById('accountCode');
    const dateInput = document.getElementById('date');
    const submitButton = document.getElementById('submitButton');
    const messageElement = document.getElementById('message');

    // Mapeamento de todas as contas contábeis
    const allAccounts = [
        { code: "5110", text: "Multas e Indenizações Recebidas", type: "R" },
        { code: "5200", text: "Venda de Passagens Avulsas", type: "R" },
        { code: "5350", text: "Receita com Transporte de Cargas", type: "R" },
        { code: "6110", text: "Salários e Encargos", type: "D" },
        { code: "6321", text: "Pagamento a Fornecedores (Serviços)", type: "D" },
        { code: "6410", text: "Despesas com Manutenção de Frota", type: "D" },
        { code: "6420", text: "Combustíveis e Lubrificantes", type: "D" },
        { code: "6800", text: "Despesas Não Operacionais", type: "D" }
    ];

    // --- INICIALIZAÇÃO DO FORMULÁRIO ---
    function initializeForm() {
        // Define a data atual como padrão e máxima
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.max = today;
    }

    // --- LÓGICA DE FILTRAGEM DINÂMICA ---
    transactionTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        
        // Limpa as opções atuais
        accountCodeSelect.innerHTML = '<option value="">Selecione a Categoria...</option>';

        if (selectedType) {
            // Filtra as contas com base no tipo selecionado
            const filteredAccounts = allAccounts.filter(account => account.type === selectedType);
            
            // Adiciona as contas filtradas ao select
            filteredAccounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.code;
                option.textContent = `${account.code} - ${account.text}`;
                accountCodeSelect.appendChild(option);
            });

            accountCodeSelect.disabled = false;
        } else {
            accountCodeSelect.innerHTML = '<option value="">Aguardando tipo de movimento...</option>';
            accountCodeSelect.disabled = true;
        }
    });

    // --- SUBMISSÃO DO FORMULÁRIO ---
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // 1. Feedback visual de carregamento
        const buttonText = submitButton.querySelector('.button-text');
        buttonText.style.display = 'none';
        const loader = document.createElement('div');
        loader.className = 'loader';
        submitButton.appendChild(loader);
        submitButton.disabled = true;

        // 2. Coleta dos dados
        const amountValue = parseFloat(document.getElementById('amount').value);
        const entryData = {
            tipo: transactionTypeSelect.value,
            centroCusto: document.getElementById('costCenter').value,
            contaContabil: accountCodeSelect.value,
            valor: amountValue,
            data: dateInput.value,
            fornecedorCliente: document.getElementById('supplierCustomer').value,
            descricao: document.getElementById('description').value
        };

        console.log("Dados prontos para envio:", entryData);

        // 3. Simulação de envio para o Backend (2 segundos)
        setTimeout(() => {
            // 4. Feedback de sucesso para o Usuário
            messageElement.textContent = `✅ Lançamento de ${amountValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} registrado com sucesso!`;
            messageElement.style.display = 'block';
            
            // 5. Limpar o formulário e redefinir estados
            form.reset();
            initializeForm(); // Redefine a data
            accountCodeSelect.innerHTML = '<option value="">Aguardando tipo de movimento...</option>';
            accountCodeSelect.disabled = true;
            transactionTypeSelect.focus();

            // 6. Restaurar o botão
            submitButton.removeChild(loader);
            buttonText.style.display = 'inline';
            submitButton.disabled = false;

            // 7. Ocultar a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 5000);

        }, 2000); // Simula um atraso de 2 segundos da rede
    });

    // Roda a inicialização ao carregar a página
    initializeForm();
});