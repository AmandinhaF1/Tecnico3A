<?php

function contarPares($numeros) {
  $contador = 0;
  foreach ($numeros as $numero) {
    if ($numero % 2 == 0) {
      $contador++;
    }
  }
  return $contador;
}

$meuArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

$quantidadePares = contarPares($meuArray);

echo "No array existem " . $quantidadePares . " números pares.";

?>