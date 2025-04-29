<?php

$a = 4;

switch($a){
    case 0:
        echo"tenho um valor 0";
        break;
        case 1:
            echo"tenho um valor 1";
            break;
    case 2:
    case 3:
    case 4:
    case 5:
        echo"Tenho um valor entre 2 e 5!";
        break;
    default:
        echo "Tenho um valor diferente.";
        break;
}
echo "<br>";

$curso = "PHP";

switch($curso){
    case 'PHP':
        echo "curso de PHP";
        break;
    case 'JAVA':
        echo "curso de JAVA";
        break;
    default:
        echo "outro curso";
        break;    
}