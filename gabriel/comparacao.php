<?php
//Importancia do arquivo Produto.php
require_once "src/Classes/Clientes.php";

//Instancia do produto
$prod1 = new Produto;
$prod1 -> titulo = "Album de música";
$prod1 -> descricao = "Resumo para Descrição: Eternal Sunshine da Ariana Grande";
"Lançado em 8 de março de 2024, marcou uma nova etapa da carreira da Ariana Grande e um novo marco na indústria da música";
$prod1 -> preco = 98.80;

$prod2 = new Produto;
$prod2 -> titulo = "Thank u, next";
$prod2 -> descricao = "Um marco na carreira da Ariana Grande, e na história também, Thank u, next é um albúm maravilhoso com músicas incríveis";
$prod2 -> preco = 78.90;

var_dump($prod1 == $prod2); //tipo e propriedade !=
var_dump($prod1 == $prod2); //Referência !==

$prod3 = new Produto;
$prod3 -> titulo = "Brighter days ahead";
$prod3 -> descricao = "Deluxe do Eternal Sunshine, contou com muitas histórias sobre sua última relação com Dalton Gomez, é com certeza muito carregado de emoção e realismo.";
$prod3 -> preco = "120.89";

var_dump($prod1 == $prod3); //(true)

$prod4 = $prod1;

var_dump($prod1 === $prod4); //(true)
echo "<br>";
var_dump($prod1);
echo "<br>";
var_dump($prod2);
echo "<br>";
var_dump($prod4);