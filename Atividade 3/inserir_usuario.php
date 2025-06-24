<?php
header('Content-Type: application/json');

// Verificar se os dados foram enviados via POST
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Conectar com o banco
    $conn = new mysqli ("localhost","root","","estoque"); // Altere o nome do banco para 'empresa'

    if($conn->connect_error) {
        die(json_encode(["erro" => "Erro ao conectar"]));
    }

    //Receber e limpar os dados
    $nome = $conn -> real_escape_string($_POST['nome']);
    $matricula = $conn -> real_escape_string($_POST['matricula']); // Nova variável
    $funcao = $conn -> real_escape_string($_POST['funcao']); // Nova variável

    //Inserir no banco
    $sql = "INSERT INTO usuarios (nome, matricula, funcao) VALUES('$nome', '$matricula', '$funcao')"; // Novas colunas
    if($conn -> query($sql)){
        echo json_encode(["sucesso" =>true,"mensagem" =>"Usuario inserido com sucesso!"]); // Mensagem atualizada
    } else {
        echo json_encode(["erro" => "Erro ao inserir usuario."]); // Mensagem atualizada
    }
    $conn->close();
} else {
    echo json_encode(["erro" => "Requisição inválida."]);
}
?>