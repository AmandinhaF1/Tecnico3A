<?php
//imortação do arquivo produto.php
require_once "src/Classes/Produto.php";
//Importação do arquivo Cliente.php
require_once "src/Classes/Produto.php";

// Instancia do Produto
$prod1 = new Produt;
$prod1 -> titulo = "Eternal Sunshine";
$prod1 -> descrição = "Lançado em 8 de março de 2024, marcou uma nova etapa da carreira da Ariana Grande e um novo marco na indústria da música.";
$prod1 -> preco = 98.80;

$prod2 = clone $prod1;
$prod2 -> preco = 98.80;

function alterarProduto($produto)
{
    $produto -> titulo = "Eternal Sunshine";
    return $produto;
}
$prod3 = alterarProduto(clone $prod1);

var_dump(prod1);
var_dump(prod2);
var_dump(prod3);