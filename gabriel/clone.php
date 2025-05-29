<?php
//importação de arquivo produto.php
require_once "src/classes/produto.php";
//importação de arquivo Cliente.php
require_once "src/classes/Cliente.php";


//intancia de produto
$prod1 = new produto;
$prod1 -> titulo = "Eternal Sunshine";
$prod1 -> ano lançamento = "2024";
$prod1 -> genero = "Pop";
$prod1 -> descricao1 = "Lançado em 8 de março de 2024, marcou uma nova etapa da carreira da Ariana Grande e um novo marco na indústria da música";
$prod1 -> preco = 98.80;

$prod2 = new produto;
$prod2 = clone $prod2;
$prod2 -> preco = 78.90;

function alterarProduto($produto)
{
    $produto -> titulo = "Sandeiro";
    return $produto;
}
$prod3 = alter(clone $prod1);

var_dump($prod1);
var_dump($prod2);
var_dump($prod3);