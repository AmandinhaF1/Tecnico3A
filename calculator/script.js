document.addEventListener('DOMContentLoaded', () => {
    const visor = document.getElementById('visor'); const botoes =
    document.querySelectorAll('.btn');
    //Declaração de Variaveis
    let entradaAtual = '0';
    let primeiroOperando = null;
    let operador = null;
    let aguardaSegundoOperando = false;
    atualizarVisor();
    function atualizarVisor() {
    visor.value = entradaAtual;
    }
    // Função para lidar com cliques nos botões
    function lidarComCliqueDoBotao(evento) {
    const valor = evento.target.textContent;
    lidarComEntrada(valor);
    }
    // Função para lidar com a entrada (botão ou teclado)
    function lidarComEntrada(valor) {
    if (valor === 'C') {
    reiniciarCalculadora();
    return;
    }
    if (valor === '←' || valor === 'Backspace') {
    entradaAtual = entradaAtual.slice(0, -1) || '0';
    atualizarVisor();
    return;
    }
    
    if (valor === '=' || valor === 'Enter') {
    lidarComOperador('=');
    return;
    }
    if (['+', '-', '*', '/'].includes(valor)) {
    lidarComOperador(valor);
    return;
    }
    
    // Lidar com números e o ponto decimal
    if (valor >= '0' && valor <= '9' || valor === '.') {
    if (aguardaSegundoOperando) {
    entradaAtual = valor;
    aguardaSegundoOperando = false;
    } else {
    entradaAtual = entradaAtual === '0' ? valor :
    entradaAtual + valor;
    }
    }
    atualizarVisor();
    }
    function lidarComOperador(proximoOperador) {
    const valorEntrada = parseFloat(entradaAtual);
    if (operador && aguardaSegundoOperando) {
    operador = proximoOperador;
    return;
    }
    if (primeiroOperando === null) {
    primeiroOperando = valorEntrada;
    } else if (operador) {
    const resultado =
    realizarCalculo[operador](primeiroOperando, valorEntrada);
    entradaAtual = `${resultado}`;
    primeiroOperando = resultado;
    }
    aguardaSegundoOperando = true;
    operador = proximoOperador;
    atualizarVisor();
    }
    
    const realizarCalculo = {
    '/': (primeiroOperando, segundoOperando) =>
    primeiroOperando / segundoOperando,
    '*': (primeiroOperando, segundoOperando) =>
    primeiroOperando * segundoOperando,
    '+': (primeiroOperando, segundoOperando) =>
    primeiroOperando + segundoOperando,
    '-': (primeiroOperando, segundoOperando) =>
    primeiroOperando - segundoOperando,
    };
    function reiniciarCalculadora() {
    entradaAtual = '0';
    
    primeiroOperando = null;
    operador = null;
    aguardaSegundoOperando = false;
    atualizarVisor();
    }
    // Adiciona "event listeners" para os botões
    botoes.forEach(botao => {
    botao.addEventListener('click', lidarComCliqueDoBotao);
    });
    // Adiciona "event listener" para o teclado
    document.addEventListener('keydown', (evento) => {
    const tecla = evento.key;
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+',
    '-', '*', '/', '.', 'Enter', 'Backspace',
    'Escape'].includes(tecla)) {
    // 'Escape' é mapeado para o botão 'C'
    const valor = tecla === 'Escape' ? 'C' : tecla;
    lidarComEntrada(valor);
    }
    });
    
    });