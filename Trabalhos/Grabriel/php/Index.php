<?php
//importação de arquivo produto.php
require_once "src/classes/produto.php";
//importação de arquivo Cliente.php
require_once "src/classes/Cliente.php";


//intancia de produto
$prod1 = new produto;
$prod1 -> titulo = "Gol";
$prod1 -> descricao = "1980";
$prod1 -> modelo = "G1";
$prod1-> motor = "1.3";
$prod1 -> potencia = "46 cv";
$prod1 -> transmissão = "Manual de 4 marchas";
$prod1 -> descricao1 = "Resumo para Descrição: Volkswagen Gol 1980";
"O Volkswagen Gol 1980 marcou o lançamento de um carro icônico no Brasil, projetado para substituir o Brasília e modernizar a linha da Volkswagen. Inicialmente com um design inovador e mecânica simples, destacou-se pela estabilidade e bons freios, apesar do motor 1.3L refrigerado a ar ser considerado subpotente. Este modelo pioneiro, disponível nas versões N e L, pavimentou o caminho para uma família de veículos de sucesso e se tornou um dos carros mais vendidos do país por muitos anos. O Gol 1980 representa o início de uma era para a Volkswagen no Brasil.";
$prod1 -> preco = "54.500";


$prod2 = new produto;
$prod2 -> titulo = "Sandeiro";
$prod2 -> descricao = "2007";
$prod2 -> modelo = "Authentique, Expression e Privilege";
$prod2 -> motor = "1.0";
$prod2 -> potencia = "76 cv a gasolina";
$prod2 -> potencia = "77 cv a alcool";
$prod2 -> Transmissão = "Manual de 5 marchas";
$prod2 -> descricao2 = "O Renault Sandero 2007 marcou a chegada de um hatchback compacto e prático ao mercado brasileiro. Priorizando o espaço interno generoso e um porta-malas amplo para a sua categoria, o modelo oferecia robustez e manutenção acessível. Disponível inicialmente com motores 1.4L e 1.6L, o Sandero se posicionou como uma opção funcional, embora pudesse apresentar um acabamento mais simples e isolamento acústico limitado. Ideal para quem buscava um carro espaçoso e confiável com bom custo-benefício.";
$prod2 -> preco = 34.500;

var_dump($prod1);
echo "<br>";
var_dump($prod1);

$cli = new Cliente;
$cli -> nome = "joão";
$cli -> idade = 40;
$cli -> endereco = "Rua A";
$cli -> telefone = "41-xxxx-xxxx";

$cli ->comprar();
echo "<br>";
var_dump($cli);



var_dump($prod2);
echo "<br>";
var_dump($prod2);

$cli = new Cliente;
$cli -> nome = "joão";
$cli -> idade = 40;
$cli -> endereco = "Rua A";
$cli -> telefone = "41-xxxx-xxxx";

$cli ->comprar();
echo "<br>";
var_dump($cli);