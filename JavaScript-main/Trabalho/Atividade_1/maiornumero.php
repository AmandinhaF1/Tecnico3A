<?php

function encontrarMaiorNumero($numeros) {
  if (empty($numeros)) {
    return "O array está vazio.";
  }
  $maior = $numeros[0]; 
  foreach ($numeros as $numero) {
    if ($numero > $maior) {
      $maior = $numero;
    }
  }
  return $maior;
}


$meuArray = [15, 7, 23, 9, 42];


$maiorNumero = encontrarMaiorNumero($meuArray);


echo "O maior número do array é: " . $maiorNumero;

?>