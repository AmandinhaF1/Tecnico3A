<?php

$host = 'localhost';
$datebase = 'usuarios';
$usuario = 'root';
$senha = '';

$mysqli = new mysqli($host,$usuario,$senha,$datebase);

if($mysqli -> connect_error){
    die("Falha ao conectar ao banco de dados: " . $maysqli->connect_error);
}

?>