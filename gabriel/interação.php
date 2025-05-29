<?php
//Importação de arquivo Produto.php
require_once "src/Classes/Produto.php";

//Instancia do Produto
$prod1 = new Produt;
$prod1 -> titulo = "Eternal Sunshine";
$prod1 -> descrição = "Lançado em 8 de março de 2024, marcou uma nova etapa da carreira da Ariana Grande e um novo marco na indústria da música";
$prod1 -> preco = 98.90;

foreach ($prod1 as $nome => $valor) {
    echo "$nome: $valor <br>";
}