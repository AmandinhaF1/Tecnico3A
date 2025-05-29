<?php

require_once "src/Classe/cliente.php";

$cli = new Cliente;
$cli -> nome = "joão";
$cli -> idade = 40;
$cli -> endereco = "Rua A";
$cli -> telefone = "41-xxxx-xxxx";
$cli ->comprar();

echo "<br>";

$cli2 = new Cliente;
$cli2 -> nome = ("ste");
$cli2 -> idade = 17;
$cli2 -> endereco = "Rua A";
$cli2 -> telefone = "41-xxxx-xxxx";
$cli2 ->comprar();