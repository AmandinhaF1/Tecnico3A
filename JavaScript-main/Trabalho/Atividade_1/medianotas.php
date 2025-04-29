<?php

$nota1 = 8.5;
$nota2 = 6.0;
$nota3 = 9.2;

$media = ($nota1 + $nota2 + $nota3) / 3;

echo "Média: " . $media . "\n";

if ($media >= 7) {
    echo "Situação: Aprovado\n";
} elseif ($media >= 5 && $media < 7) {
    echo "Situação: Recuperação\n";
} else {
    echo "Situação: Reprovado\n";
}

?>