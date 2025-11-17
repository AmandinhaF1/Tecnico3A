document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DADOS DE EXEMPLO (AGORA É A ÚNICA FONTE) ---
    let dadosDiarios = [
        { periodo: '17/11/2025', receitas: 1500, despesas: 400 },
        { periodo: '18/11/2025', receitas: 0, despesas: 250 },
        { periodo: '19/11/2025', receitas: 2200, despesas: 800 },
        { periodo: '20/11/2025', receitas: 500, despesas: 150 },
        { periodo: '21/11/2025', receitas: 0, despesas: 1100 },
    ];

    // DADOS ESTÁTICOS REMOVIDOS! (const dadosSemanais e dadosMensais foram apagados)

    // --- 2. REFERÊNCIAS AOS ELEMENTOS DO DOM ---
    const btnDiario = document.getElementById('btnDiario');
    const btnSemanal = document.getElementById('btnSemanal');
    const btnMensal = document.getElementById('btnMensal');
    const tableBody = document.getElementById('tableBody');
    const tableEl = document.getElementById('cashflowTable');
    const allTabs = document.querySelectorAll('.tab-button');

    const formEntrada = document.getElementById('formEntrada');
    const inputData = document.getElementById('inputData');
    const inputDataFim = document.getElementById('inputDataFim');
    const inputDescricao = document.getElementById('inputDescricao');
    const inputValor = document.getElementById('inputValor');
    const selectTipo = document.getElementById('selectTipo');

    // --- 3. FUNÇÕES HELPER (Auxiliares de Data) ---

    /** Converte "dd/mm/yyyy" para um objeto Date */
    function parseData(strData) {
        const [dia, mes, ano] = strData.split('/').map(Number);
        return new Date(ano, mes - 1, dia); // Mês é 0-indexado
    }

    /** Formata um objeto Date para "dd/mm" */
    function formatarDataCurta(d) {
        const dia = String(d.getDate()).padStart(2, '0');
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        return `${dia}/${mes}`;
    }

    /** Pega o início da semana (Segunda-feira) para uma data */
    function getStartOfWeek(d) {
        const data = new Date(d);
        const diaDaSemana = data.getDay(); // 0=Domingo, 1=Segunda
        const diff = data.getDate() - diaDaSemana + (diaDaSemana === 0 ? -6 : 1); // Ajusta para Segunda
        return new Date(data.setDate(diff));
    }

    /** Pega o número da semana no ano */
    function getWeekNumber(d) {
        const data = new Date(d.getTime());
        data.setHours(0, 0, 0, 0);
        data.setDate(data.getDate() + 3 - (data.getDay() + 6) % 7);
        const inicioAno = new Date(data.getFullYear(), 0, 4);
        return 1 + Math.round(((data - inicioAno) / 86400000 - 3 + (inicioAno.getDay() + 6) % 7) / 7);
    }

    // --- 4. NOVAS FUNÇÕES DE CÁLCULO ---

    /** Agrupa os dados diários em totais semanais */
    function calcularTotaisSemanais(entradasDiarias) {
        const semanas = {}; // Objeto para agrupar

        for (const item of entradasDiarias) {
            const data = parseData(item.periodo);
            const inicioSemana = getStartOfWeek(data);
            const key = inicioSemana.toISOString().split('T')[0]; // '2025-11-17'

            if (!semanas[key]) {
                const fimSemana = new Date(inicioSemana);
                fimSemana.setDate(fimSemana.getDate() + 6);
                const numSemana = getWeekNumber(data);

                semanas[key] = {
                    periodo: `Semana ${numSemana} (${formatarDataCurta(inicioSemana)}-${formatarDataCurta(fimSemana)})`,
                    receitas: 0,
                    despesas: 0,
                    _date: inicioSemana // para ordenação
                };
            }
            semanas[key].receitas += item.receitas;
            semanas[key].despesas += item.despesas;
        }
        // Converte o objeto em array e ordena
        return Object.values(semanas).sort((a, b) => a._date - b._date);
    }

    /** Agrupa os dados diários em totais mensais */
    function calcularTotaisMensais(entradasDiarias) {
        const meses = {}; // Objeto para agrupar
        const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        for (const item of entradasDiarias) {
            const data = parseData(item.periodo);
            const ano = data.getFullYear();
            const mesIndex = data.getMonth(); // 0 = Jan, 10 = Nov
            const key = `${ano}-${mesIndex}`;

            if (!meses[key]) {
                meses[key] = {
                    periodo: `${nomeMeses[mesIndex]}/${ano}`,
                    receitas: 0,
                    despesas: 0,
                    _date: data // para ordenação
                };
            }
            meses[key].receitas += item.receitas;
            meses[key].despesas += item.despesas;
        }
        // Converte o objeto em array e ordena
        return Object.values(meses).sort((a, b) => a._date - b._date);
    }


    // --- 5. FUNÇÕES PRINCIPAIS (Renderização, Edição, Exclusão) ---

    function formatarDinheiro(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function atualizarAbaAtiva(abaClicada) {
        allTabs.forEach(tab => tab.classList.remove('active'));
        abaClicada.classList.add('active');
    }

    function renderizarTabela(dados, tipoView = 'outros') {
        tableBody.innerHTML = '';
        let saldoAcumulado = 0;

        if (tipoView === 'diario') {
            tableEl.classList.add('view-diario');
        } else {
            tableEl.classList.remove('view-diario');
        }

        dados.forEach(item => {
            const saldoPeriodo = item.receitas - item.despesas;
            saldoAcumulado += saldoPeriodo;
            const classeSaldoPeriodo = saldoPeriodo >= 0 ? 'positive' : 'negative';
            const classeSaldoAcumulado = saldoAcumulado >= 0 ? 'positive' : 'negative';

            let acoesHtml = '';
            // Ações de Editar/Excluir SÓ aparecem na visão diária
            if (tipoView === 'diario') {
                acoesHtml = `
                    <td class="acoes">
                        <button class="btn-action btn-edit" data-periodo="${item.periodo}">Editar</button>
                        <button class="btn-action btn-delete" data-periodo="${item.periodo}">Excluir</button>
                    </td>
                `;
            }

            const linha = `
                <tr>
                    <td><strong>${item.periodo}</strong></td>
                    <td class="positive">${formatarDinheiro(item.receitas)}</td>
                    <td class="negative">${formatarDinheiro(item.despesas)}</td>
                    <td class="${classeSaldoPeriodo}">${formatarDinheiro(saldoPeriodo)}</td>
                    <td class="${classeSaldoAcumulado}">${formatarDinheiro(saldoAcumulado)}</td>
                    ${acoesHtml}
                </tr>
            `;
            tableBody.innerHTML += linha;
        });
    }

    function formatarDataParaPadrao(dateObj) {
        const dia = String(dateObj.getDate()).padStart(2, '0');
        const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
        const ano = dateObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function handleNovaEntrada(event) {
        event.preventDefault(); 
        const dataInicioValor = inputData.value;
        const dataFimValor = inputDataFim.value;
        const valor = parseFloat(inputValor.value);
        const tipo = selectTipo.value;

        if (!dataInicioValor || isNaN(valor) || valor <= 0) {
            alert("Por favor, preencha a Data de Início e um valor válido.");
            return;
        }

        const [anoI, mesI, diaI] = dataInicioValor.split('-').map(Number);
        const dataInicio = new Date(anoI, mesI - 1, diaI);

        let dataFim;
        if (dataFimValor) {
            const [anoF, mesF, diaF] = dataFimValor.split('-').map(Number);
            dataFim = new Date(anoF, mesF - 1, diaF);
        } else {
            dataFim = dataInicio;
        }

        if (dataFim < dataInicio) {
            alert("A Data de Fim não pode ser anterior à Data de Início.");
            return;
        }

        for (let d = new Date(dataInicio); d <= dataFim; d.setDate(d.getDate() + 1)) {
            const dataFormatada = formatarDataParaPadrao(d);
            let entradaExistente = dadosDiarios.find(item => item.periodo === dataFormatada);

            if (entradaExistente) {
                if (tipo === 'receita') {
                    entradaExistente.receitas += valor;
                } else {
                    entradaExistente.despesas += valor;
                }
            } else {
                const novaEntrada = {
                    periodo: dataFormatada,
                    receitas: tipo === 'receita' ? valor : 0,
                    despesas: tipo === 'despesa' ? valor : 0,
                };
                dadosDiarios.push(novaEntrada);
            }
        }

        dadosDiarios.sort((a, b) => parseData(a.periodo) - parseData(b.periodo));

        formEntrada.reset(); 
        inputData.focus(); 
        inputData.value = dataInicioValor;

        atualizarAbaAtiva(btnDiario);
        renderizarTabela(dadosDiarios, 'diario');
    }

    function iniciarEdicao(periodo) { /* ... (Sem alteração) ... */ }
    function excluirEntrada(periodo) { /* ... (Sem alteração) ... */ }
    function handleTableClick(event) { /* ... (Sem alteração) ... */ }
    // Colando as funções de editar/excluir/click aqui para garantir
    function iniciarEdicao(periodo) {
        const item = dadosDiarios.find(d => d.periodo === periodo);
        if (!item) return;
        const novaReceitaStr = prompt(`Editar Receitas para ${periodo}:`, item.receitas);
        if (novaReceitaStr === null) return; 
        const novaDespesaStr = prompt(`Editar Despesas para ${periodo}:`, item.despesas);
        if (novaDespesaStr === null) return;
        const novaReceita = parseFloat(novaReceitaStr);
        if (!isNaN(novaReceita) && novaReceita >= 0) item.receitas = novaReceita;
        const novaDespesa = parseFloat(novaDespesaStr);
        if (!isNaN(novaDespesa) && novaDespesa >= 0) item.despesas = novaDespesa;
        renderizarTabela(dadosDiarios, 'diario');
    }
    function excluirEntrada(periodo) {
        if (confirm(`Tem certeza que deseja excluir todas as entradas do dia ${periodo}?`)) {
            dadosDiarios = dadosDiarios.filter(item => item.periodo !== periodo);
            renderizarTabela(dadosDiarios, 'diario');
        }
    }
    function handleTableClick(event) {
        const target = event.target; 
        if (target.classList.contains('btn-edit')) {
            iniciarEdicao(target.dataset.periodo);
        }
        if (target.classList.contains('btn-delete')) {
            excluirEntrada(target.dataset.periodo);
        }
    }


    // --- 6. EVENT LISTENERS (MODIFICADOS) ---

    btnDiario.addEventListener('click', () => {
        atualizarAbaAtiva(btnDiario);
        renderizarTabela(dadosDiarios, 'diario');
    });

    btnSemanal.addEventListener('click', () => {
        atualizarAbaAtiva(btnSemanal);
        // MODIFICADO: Calcula os totais antes de renderizar
        const totaisSemanais = calcularTotaisSemanais(dadosDiarios);
        renderizarTabela(totaisSemanais, 'semanal');
    });

    btnMensal.addEventListener('click', () => {
        atualizarAbaAtiva(btnMensal);
        // MODIFICADO: Calcula os totais antes de renderizar
        const totaisMensais = calcularTotaisMensais(dadosDiarios);
        renderizarTabela(totaisMensais, 'mensal');
    });

    formEntrada.addEventListener('submit', handleNovaEntrada);
    tableBody.addEventListener('click', handleTableClick);

    // --- 7. INICIALIZAÇÃO ---
    const hoje = new Date();
    const offset = hoje.getTimezoneOffset();
    const hojeLocal = new Date(hoje.getTime() - (offset*60*1000));
    const dataString = hojeLocal.toISOString().split('T')[0];
    
    inputData.value = dataString;
    inputDataFim.value = ""; 

    renderizarTabela(dadosDiarios, 'diario');
});