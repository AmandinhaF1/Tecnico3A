<?php
header('Content-Type: application/json');

//Conectar ao banco de dados
$conn = new mysqli("localhost", "root", "", "estoque"); // Altere o nome do banco para 'empresa'

if($conn->connect_error) {
    die(json_encode(["erro" =>"Erro na conexão do banco"]));
}

//Consulta SQL
$sql = "SELECT nome,matricula,funcao FROM usuarios"; // Seleciona as novas colunas
$resultado = $conn -> query($sql);

$usuario = []; // Renomeado de $produtos para $funcionarios

while($linha = $resultado -> fetch_assoc()) {
    $usuario[] = $linha;
}

echo json_encode($usuario); // Codifica a nova variável