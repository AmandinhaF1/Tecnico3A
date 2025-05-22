document.addEventListener('DOMContentLoaded', () => {
    const formProduto = document.getElementById('form-produto');
    const tabelaProdutos = document.getElementById('tabela-produtos');
    const buscaInput = document.getElementById('busca');

    let produtos = JSON.parse(localStorage.getItem('produtosPetShop')) || [];

    
    function renderizarProdutos(filtro = '') {
        tabelaProdutos.innerHTML = ''; 

        const produtosFiltrados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            produto.categoria.toLowerCase().includes(filtro.toLowerCase())
        );

        produtosFiltrados.forEach((produto, index) => {
            const row = tabelaProdutos.insertRow();
            row.insertCell(0).textContent = produto.nome;
            row.insertCell(1).textContent = produto.quantidade;
            row.insertCell(2).textContent = produto.unidade;
            row.insertCell(3).textContent = produto.categoria;

            const acoesCell = row.insertCell(4);
            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.classList.add('btn-editar');
            editarBtn.addEventListener('click', () => editarProduto(index));
            acoesCell.appendChild(editarBtn);

            const excluirBtn = document.createElement('button');
            excluirBtn.textContent = 'Excluir';
            excluirBtn.classList.add('btn-excluir');
            excluirBtn.addEventListener('click', () => excluirProduto(index));
            acoesCell.appendChild(excluirBtn);
        });
    }

    
    formProduto.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const unidade = document.getElementById('unidade').value;
        const categoria = document.getElementById('categoria').value;

        const novoProduto = { nome, quantidade, unidade, categoria };
        produtos.push(novoProduto);
        localStorage.setItem('produtosPetShop', JSON.stringify(produtos));
        formProduto.reset();
        renderizarProdutos();
    });

    
    function editarProduto(index) {
        const produto = produtos[index];
        const novoNome = prompt('Editar nome:', produto.nome);
        const novaQuantidade = parseInt(prompt('Editar quantidade:', produto.quantidade));
        const novaUnidade = prompt('Editar unidade:', produto.unidade);
        const novaCategoria = prompt('Editar categoria:', produto.categoria);

        if (novoNome !== null && !isNaN(novaQuantidade) && novaUnidade !== null && novaCategoria !== null) {
            produtos[index] = {
                nome: novoNome,
                quantidade: novaQuantidade,
                unidade: novaUnidade,
                categoria: novaCategoria
            };
            localStorage.setItem('produtosPetShop', JSON.stringify(produtos));
            renderizarProdutos();
        }
    }

    
    function excluirProduto(index) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            produtos.splice(index, 1);
            localStorage.setItem('produtosPetShop', JSON.stringify(produtos));
            renderizarProdutos();
        }
    }

    
    buscaInput.addEventListener('input', (e) => {
        renderizarProdutos(e.target.value);
    });

   
    renderizarProdutos();
});