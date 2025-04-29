<?php

function isPrimo($numero) {
  
if ($numero <= 1) {
    return false;
  }

  
if ($numero == 2) {
    return true;
  }

if ($numero % 2 == 0) {
    return false;
  }

  $limite = sqrt($numero);
  for ($i = 3; $i <= $limite; $i += 2) {
    if ($numero % $i == 0) {
      return false;
    }
  }

  return true; 
}

echo "Testando se os números são primos:\n";

$testes = [2, 3, 4, 5, 6, 7, 10, 11, 15, 17, 20];

foreach ($testes as $num) {
  if (isPrimo($num)) {
    echo "$num é primo.\n";
  } else {
    echo "$num não é primo.\n";
  }
}

?>