document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCalculo');
    const valorBaseInput = document.getElementById('valorBase');
    const tipoImpostoSelect = document.getElementById('tipoImposto');
    
    const resValorBase = document.getElementById('resultadoValorBase');
    const resImpostoNome = document.getElementById('resultadoImpostoNome');
    const resValorImposto = document.getElementById('resultadoValorImposto');
    const resValorTotal = document.getElementById('resultadoValorTotal');

    const impostos = {
        icms: { nome: "ICMS (18%)", aliquota: 0.18 },
        iss: { nome: "ISS (5%)", aliquota: 0.05 },
        ipi: { nome: "IPI (10%)", aliquota: 0.10 }
    };

    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const valorBase = parseFloat(valorBaseInput.value);
        const tipoImposto = tipoImpostoSelect.value;
        
        if (isNaN(valorBase) || valorBase <= 0 || !tipoImposto) {
            alert('Por favor, preencha o valor base e selecione um tipo de imposto/taxa válido.');
            return;
        }

        const impostoInfo = impostos[tipoImposto];
        const aliquota = impostoInfo.aliquota;
        const nomeImposto = impostoInfo.nome;
        
        const valorImposto = valorBase * aliquota;
        const valorTotal = valorBase + valorImposto;

        resValorBase.textContent = formatarMoeda(valorBase);
        resImpostoNome.textContent = nomeImposto;
        resValorImposto.textContent = formatarMoeda(valorImposto);
        resValorTotal.textContent = formatarMoeda(valorTotal);
    });
});