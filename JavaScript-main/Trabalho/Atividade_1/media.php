<?php

function calcularMedia($n1, $n2, $n3) {
  $media = ($n1 + $n2 + $n3) / 3;
  return $media;
}

$nota1 = 7.5;
$nota2 = 8.0;
$nota3 = 6.5;

$mediaFinal = calcularMedia($nota1, $nota2, $nota3);

echo "A média das notas é: " . $mediaFinal;

?>