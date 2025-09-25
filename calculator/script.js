document.addEventListener('DOMContentLoaded', () => {
    const visor = document.getElementById('visor');
    const botoes = document.querySelectorAll('.calculadora .btn');

    // Estado da Calculadora
    let entradaAtual = '0';
    let primeiroOperando = null;
    let operador = null;
    let aguardaSegundoOperando = false;

    atualizarVisor();

    function atualizarVisor() {
        visor.value = entradaAtual;
    }

    // Adiciona o listener de clique a todos os botões
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const valor = botao.textContent;
            const classes = botao.classList;

            if (classes.contains('numero') || valor === '.') {
                lidarComNumero(valor);
            } else if (classes.contains('operador')) {
                // O operador de potência 'xʸ' será representado por '^' internamente
                lidarComOperador(valor === 'xʸ' ? '^' : valor);
            } else if (classes.contains('funcao')) {
                lidarComFuncao(valor);
            } else if (classes.contains('constante')) {
                lidarComConstante(valor);
            } else if (valor === '=') {
                lidarComOperador('=');
            } else if (valor === 'C') {
                reiniciarCalculadora();
            } else if (valor === '←') {
                apagarUltimoDigito();
            }
        });
    });

    function lidarComNumero(numero) {
        if (numero === '.' && entradaAtual.includes('.')) return;

        if (aguardaSegundoOperando) {
            entradaAtual = numero;
            aguardaSegundoOperando = false;
        } else {
            entradaAtual = entradaAtual === '0' ? numero : entradaAtual + numero;
        }
        atualizarVisor();
    }

    function apagarUltimoDigito() {
        entradaAtual = entradaAtual.slice(0, -1) || '0';
        atualizarVisor();
    }
    
    // Lógica para operadores binários (+, -, *, /, ^)
    function lidarComOperador(proximoOperador) {
        const valorEntrada = parseFloat(entradaAtual);

        if (operador && aguardaSegundoOperando) {
            if (proximoOperador !== '=') {
                operador = proximoOperador;
            }
            return;
        }

        if (primeiroOperando === null && !isNaN(valorEntrada)) {
            primeiroOperando = valorEntrada;
        } else if (operador) {
            const resultado = realizarCalculo[operador](primeiroOperando, valorEntrada);
            if (!isFinite(resultado)) {
                entradaAtual = 'Erro';
                atualizarVisor();
                reiniciarCalculadoraParcialmente();
                return;
            }
            entradaAtual = String(resultado);
            primeiroOperando = resultado;
        }

        aguardaSegundoOperando = proximoOperador !== '=';
        operador = proximoOperador === '=' ? null : proximoOperador;
        atualizarVisor();
    }
    
    // Lógica para funções unárias (sen, cos, log, etc.)
    function lidarComFuncao(funcao) {
        const valorEntrada = parseFloat(entradaAtual);
        if (isNaN(valorEntrada)) return;

        const resultado = realizarFuncao[funcao](valorEntrada);
        if (!isFinite(resultado)) {
            entradaAtual = 'Erro';
        } else {
            entradaAtual = String(resultado);
        }
        
        primeiroOperando = resultado; // Permite continuar operações com o resultado
        aguardaSegundoOperando = true; // Prepara para nova entrada ou operação
        operador = null;
        atualizarVisor();
    }
    
    // Lógica para constantes
    function lidarComConstante(constante) {
        const valores = {
            'π': Math.PI,
            'e': Math.E
        };
        entradaAtual = String(valores[constante]);
        aguardaSegundoOperando = false;
        atualizarVisor();
    }

    const realizarCalculo = {
        '/': (n1, n2) => n1 / n2,
        '*': (n1, n2) => n1 * n2,
        '+': (n1, n2) => n1 + n2,
        '-': (n1, n2) => n1 - n2,
        '^': (n1, n2) => Math.pow(n1, n2) // Potência (xʸ)
    };
    
    // Função Fatorial (não nativa no objeto Math)
    function fatorial(n) {
        if (n < 0 || n % 1 !== 0) return NaN; // Fatorial é para inteiros não negativos
        if (n === 0 || n === 1) return 1;
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }

    const realizarFuncao = {
        // Funções trigonométricas (convertendo graus para radianos)
        'sen': (x) => Math.sin(x * Math.PI / 180),
        'cos': (x) => Math.cos(x * Math.PI / 180),
        'tan': (x) => Math.tan(x * Math.PI / 180),
        // Funções trigonométricas inversas (retornando em graus)
        'asen': (x) => Math.asin(x) * 180 / Math.PI,
        'acos': (x) => Math.acos(x) * 180 / Math.PI,
        'atan': (x) => Math.atan(x) * 180 / Math.PI,
        // Hiperbólicas
        'sinh': (x) => Math.sinh(x),
        'cosh': (x) => Math.cosh(x),
        'tanh': (x) => Math.tanh(x),
        // Logarítmicas e Exponenciais
        'ln': (x) => Math.log(x),
        'log': (x) => Math.log10(x),
        // Estatística
        'n!': (x) => fatorial(x)
    };

    function reiniciarCalculadora() {
        entradaAtual = '0';
        primeiroOperando = null;
        operador = null;
        aguardaSegundoOperando = false;
        atualizarVisor();
    }

    function reiniciarCalculadoraParcialmente() {
        primeiroOperando = null;
        operador = null;
        aguardaSegundoOperando = false;
    }
});