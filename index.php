<?php

require_once "src/Classes/Comidas.php";

$com = new Comida;
$com -> nome = "Lasanha";
$com -> tempero = "Cheiro verde";
$com -> lugar_de_origem = "Itália";
$com -> preco = 29.90;
$com -> acompanhamento = "Carne";
$com -> comprar();

echo "<br>";

$com2 = new Comida;
$com2 -> definirNome("Salada");
$com2 -> tempero = "Vinagre";
$com2 -> lugar_de_origem = "X";
$com2 -> preco = 11.50;
$com2 -> acompanhamento = "Maionese";
$com2 -> comprar();

echo "<br>";

$com3 = new Comida;
$com3 -> nome = "Macarronada";
$com3 -> alterarTempero("Orégano");
$com3 -> lugar_de_origem = "Itália";
$com3 -> preco = 21.00;
$com3 -> acompanhamento = "Molho vermelho";
$com3 -> comprar();

echo "<br>";

$com4 = new Comida;
$com4 -> nome = "Feijoada";
$com4 -> tempero = "X";
$com4 -> lugar_de_origem = "Brasil";
$com4 -> alterarPreco(30.99);
$com4 -> acompanhamento = "Costelinha";
$com4 -> comprar();

echo "<br>";

$com5 = new Comida;
$com5 -> nome = "Sushi";
$com5 -> tempero = "Molho shoyu";
$com5 -> lugar_de_origem = "Japão";
$com5 -> preco = 6.20;
$com5 -> alterarAcompanhamento(Onigiri);
$com5 -> comprar();
