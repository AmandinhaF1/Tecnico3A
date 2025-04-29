<?php
$numero_fixo = 7;
$contador = 1;

while ($contador <= 10) {
  $resultado = $numero_fixo * $contador;
  echo $numero_fixo . " x " . $contador . " = " . $resultado . "\n";
  $contador++;
}
?>