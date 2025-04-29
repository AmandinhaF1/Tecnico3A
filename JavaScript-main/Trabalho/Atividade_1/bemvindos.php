<?php

function boasVindas($nome) {
  return "Seja bem-vindo, " . $nome . "!";
}


$nome1 = "stephanny";
$mensagem1 = boasVindas($nome1);
echo $mensagem1 . "\n"; 
$nome2 = "Maria";
$mensagem2 = boasVindas($nome2);
echo $mensagem2 . "\n";
$nome3 = "Esthella";
$mensagem3 = boasVindas($nome3);
echo $mensagem3 . "\n";
?>